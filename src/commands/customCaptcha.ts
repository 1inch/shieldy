import { clarifyIfPrivateMessages } from '@helpers/clarifyIfPrivateMessages'
import { saveChatProperty } from '@helpers/saveChatProperty'
import { Telegraf, Context, Extra } from 'telegraf'
import { ReplySettingType } from '@models/Chat'
import { checkLock } from '@middlewares/checkLock'
import { clarifyReply } from '@helpers/clarifyReply'
import { report } from '@helpers/report'
import { isReplyToShieldy } from '@helpers/isReplyToShieldy'
import { strings } from '@helpers/strings'

export function setupCustomCaptcha(bot: Telegraf<Context>) {
  bot.command(
    'viewCustomCaptcha',
    checkLock,
    clarifyIfPrivateMessages,
    async (ctx) => {
      let text = ''

      const tQuestion = strings(ctx.dbchat, 'custom_question_colon')
      const tAnswer = strings(ctx.dbchat, 'custom_answer_colon')

      ctx.dbchat.customCaptchaVariants.forEach((variant, i) => {
        const { question, answer } = variant

        if (i !== 0) {
          text += '\n\n'
        }
        text += `${i + 1}. ${tQuestion} ${question}\n${tAnswer} ${answer}`
      })

      if (!text) {
        text = strings(ctx.dbchat, 'custom_no_variants')
      }

      await ctx.replyWithMarkdown(text)
    },
  )

  bot.command(
    'removeAllCustomCaptcha',
    checkLock,
    clarifyIfPrivateMessages,
    async (ctx) => {
      ctx.dbchat.customCaptchaVariants = []
      await saveChatProperty(ctx.dbchat, 'customCaptchaVariants')

      await ctx.replyWithMarkdown(strings(ctx.dbchat, 'custom_removed'))
    },
  )

  bot.command(
    'addCustomCaptcha',
    checkLock,
    clarifyIfPrivateMessages,
    async (ctx) => {
      const message = await ctx.replyWithMarkdown(
        strings(ctx.dbchat, 'custom_add_question'),
      )
      ctx.dbchat.lastReplySetting = {
        type: ReplySettingType.ADD_CUSTOM_CAPTCHA,
        messageId: message.message_id,
      }
      await saveChatProperty(ctx.dbchat, 'lastReplySetting')
      await clarifyReply(ctx)
    },
  )

  // Handle reactions to replies
  async function processReply(ctx: Context) {
    const text = ctx.message.text?.trim()
    if (!text) {
      return
    }
    if (!isReplyToShieldy({ ctx, bot })) {
      return
    }

    const messageReplyId = ctx.message.reply_to_message.message_id
    const replySetting = ctx.dbchat.lastReplySetting

    // Check that it is reply to custom captcha settings message
    if (!replySetting) {
      return
    }
    if (replySetting.messageId !== messageReplyId) {
      return
    }

    switch (replySetting.type) {
      case ReplySettingType.ADD_CUSTOM_CAPTCHA:
        return await processAddCustomCaptchaReply(ctx, text)
      case ReplySettingType.ADD_CUSTOM_CAPTCHA_ANSWER:
        return await processAddCustomCaptchaAnswerReply(ctx, text)
    }
  }
  async function processAddCustomCaptchaReply(
    ctx: Context,
    customCaptchaQuestion: string,
  ) {
    const botMessage = await ctx.replyWithMarkdown(
      strings(ctx.dbchat, 'custom_add_answer'),
    )

    ctx.dbchat.lastReplySetting = {
      type: ReplySettingType.ADD_CUSTOM_CAPTCHA_ANSWER,
      messageId: botMessage.message_id,
      customCaptchaQuestion,
    }
    await saveChatProperty(ctx.dbchat, 'lastReplySetting')
  }
  async function processAddCustomCaptchaAnswerReply(
    ctx: Context,
    customCaptchaAnswer: string,
  ) {
    const { customCaptchaQuestion } = ctx.dbchat.lastReplySetting

    ctx.dbchat.customCaptchaVariants.push({
      question: customCaptchaQuestion,
      answer: customCaptchaAnswer.toLowerCase(),
    })
    await saveChatProperty(ctx.dbchat, 'customCaptchaVariants')

    await ctx.replyWithMarkdown(
      strings(ctx.dbchat, 'custom_success'),
      Extra.inReplyTo(ctx.message.message_id),
    )
  }
  bot.use(async (ctx, next) => {
    try {
      await processReply(ctx)
    } catch (err) {
      report(err)
    } finally {
      next()
    }
  })
}

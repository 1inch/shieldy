import { clarifyReply } from '@helpers/clarifyReply'
import { clarifyIfPrivateMessages } from '@helpers/clarifyIfPrivateMessages'
import { saveChatProperty } from '@helpers/saveChatProperty'
import { Telegraf, Context, Extra } from 'telegraf'
import { strings, localizations } from '@helpers/strings'
import { checkLock } from '@middlewares/checkLock'
import { report } from '@helpers/report'
import { ExtraReplyMessage } from 'telegraf/typings/telegram-types'

export function setupCaptchaMessage(bot: Telegraf<Context>) {
  // Setup command
  bot.command(
    'customCaptchaMessage',
    checkLock,
    clarifyIfPrivateMessages,
    async (ctx) => {
      let chat = ctx.dbchat
      chat.customCaptchaMessage = !chat.customCaptchaMessage
      await saveChatProperty(chat, 'customCaptchaMessage')
      await ctx.replyWithMarkdown(
        strings(
          ctx.dbchat,
          chat.customCaptchaMessage
            ? chat.captchaMessage
              ? 'captchaMessage_true_message'
              : 'captchaMessage_true'
            : 'captchaMessage_false'
        ),
        Extra.inReplyTo(ctx.message.message_id)
      )
      if (chat.customCaptchaMessage && chat.captchaMessage) {
        chat.captchaMessage.message.chat = undefined
        await ctx.telegram.sendCopy(chat.id, chat.captchaMessage.message, {
          entities: chat.captchaMessage.message.entities,
        })
      }
      await clarifyReply(ctx)
    }
  )
  // Setup checker
  bot.use(async (ctx, next) => {
    try {
      // Check if needs to check
      if (!ctx.dbchat.customCaptchaMessage) {
        return
      }
      // Check if reply
      if (!ctx.message || !ctx.message.reply_to_message) {
        return
      }
      // Check if text
      if (!ctx.message.text) {
        return
      }
      // Check if reply to shieldy
      if (
        !ctx.message.reply_to_message.from ||
        !ctx.message.reply_to_message.from.username ||
        ctx.message.reply_to_message.from.username !==
          (bot as any).botInfo.username
      ) {
        return
      }
      // Check if reply to the correct message
      const captchaMessages = Object.keys(localizations.captchaMessage_true)
        .map((k) => localizations.captchaMessage_true[k])
        .concat(
          Object.keys(localizations.captchaMessage_true_message).map(
            (k) => localizations.captchaMessage_true_message[k]
          )
        )
      if (
        !ctx.message.reply_to_message.text ||
        captchaMessages.indexOf(ctx.message.reply_to_message.text) < 0
      ) {
        return
      }
      // Save text
      ctx.dbchat.captchaMessage = {
        message: ctx.message,
      }
      await saveChatProperty(ctx.dbchat, 'captchaMessage')
      ctx.reply(
        strings(ctx.dbchat, 'greetsUsers_message_accepted'),
        Extra.inReplyTo(ctx.message.message_id) as ExtraReplyMessage
      )
    } catch (err) {
      report(err)
    } finally {
      next()
    }
  })
}

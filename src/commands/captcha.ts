import { clarifyIfPrivateMessages } from '@helpers/clarifyIfPrivateMessages'
import { saveChatProperty } from '@helpers/saveChatProperty'
import { Telegraf, Context, Extra } from 'telegraf'
import { strings } from '@helpers/strings'
import { checkIfFromReplier } from '@middlewares/checkIfFromReplier'
import { CaptchaType } from '@models/Chat'
import { checkLock } from '@middlewares/checkLock'

export function setupCaptcha(bot: Telegraf<Context>) {
  bot.command('captcha', checkLock, clarifyIfPrivateMessages, (ctx) => {
    ctx.replyWithMarkdown(
      strings(ctx.dbchat, 'captcha'),
      Extra.inReplyTo(ctx.message.message_id).markup((m) =>
        m.inlineKeyboard([
          m.callbackButton(strings(ctx.dbchat, 'simple'), 'simple'),
          m.callbackButton(strings(ctx.dbchat, 'digits'), 'digits'),
          m.callbackButton(strings(ctx.dbchat, 'button'), 'button'),
          m.callbackButton(strings(ctx.dbchat, 'image'), 'image'),
        ])
      )
    )
  })

  bot.action(
    ['simple', 'digits', 'button', 'image'],
    checkIfFromReplier,
    async (ctx) => {
      let chat = ctx.dbchat
      chat.captchaType = ctx.callbackQuery.data as CaptchaType
      await saveChatProperty(chat, 'captchaType')
      const message = ctx.callbackQuery.message

      ctx.telegram.editMessageText(
        message.chat.id,
        message.message_id,
        undefined,
        `${strings(chat, 'captcha_selected')} (${strings(
          chat,
          chat.captchaType
        )})`
      )
    }
  )
}

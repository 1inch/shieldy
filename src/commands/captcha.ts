// Dependencies
import { Telegraf, ContextMessageUpdate, Extra } from 'telegraf'
import { strings } from '../helpers/strings'
import { checkIfFromReplier } from '../middlewares/checkIfFromReplier'
import { CaptchaType } from '../models'
import { checkLock } from '../middlewares/checkLock'

export function setupCaptcha(bot: Telegraf<ContextMessageUpdate>) {
  bot.command('captcha', checkLock, ctx => {
    ctx.replyWithMarkdown(
      strings(ctx.dbchat, 'captcha'),
      Extra.inReplyTo(ctx.message.message_id).markup(m =>
        m.inlineKeyboard([
          m.callbackButton(strings(ctx.dbchat, 'simple'), 'simple'),
          m.callbackButton(strings(ctx.dbchat, 'digits'), 'digits'),
          m.callbackButton(strings(ctx.dbchat, 'button'), 'button'),
        ])
      )
    )
  })

  bot.action(['simple', 'digits', 'button'], checkIfFromReplier, async ctx => {
    let chat = ctx.dbchat
    chat.captchaType = ctx.callbackQuery.data as CaptchaType
    chat = await (chat as any).save()
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
  })
}

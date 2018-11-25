// Dependencies
import { Telegraf, ContextMessageUpdate, Extra } from 'telegraf'
import { strings } from '../helpers/strings'
import { Language } from '../models'
import { checkIfFromReplier } from '../middlewares/checkIfFromReplier'
import { checkLock } from '../middlewares/checkLock'

export function setupLanguage(bot: Telegraf<ContextMessageUpdate>) {
  bot.command('language', checkLock, ctx => {
    ctx.replyWithMarkdown(
      strings(ctx.dbchat, 'language'),
      Extra.webPreview(false)
        .inReplyTo(ctx.message.message_id)
        .markup(m =>
          m.inlineKeyboard([
            m.callbackButton('English', 'en'),
            m.callbackButton('Русский', 'ru'),
            m.callbackButton('Italiano', 'it'),
            m.callbackButton('Eesti', 'et'),
          ])
        )
    )
  })

  bot.action(['en', 'ru', 'it', 'et'], checkIfFromReplier, async ctx => {
    let chat = ctx.dbchat
    chat.language = ctx.callbackQuery.data as Language
    chat = await (chat as any).save()
    const message = ctx.callbackQuery.message

    ctx.telegram.editMessageText(
      message.chat.id,
      message.message_id,
      undefined,
      strings(chat, 'language_selected')
    )
  })
}

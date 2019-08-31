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
            [
              m.callbackButton('English', 'en'),
              m.callbackButton('Русский', 'ru'),
            ],
            [
              m.callbackButton('Italiano', 'it'),
              m.callbackButton('Eesti', 'et'),
            ],
            [
              m.callbackButton('Українська', 'uk'),
              m.callbackButton('Português Brasil', 'br'),
            ],
            [
              m.callbackButton('Türkçe', 'tr'),
              m.callbackButton('Ruslish', 'ruen'),
            ],
            [
              m.callbackButton('Español', 'es'),
              m.callbackButton('CHINESE', 'zh'),
            ],
            [
              m.callbackButton('Norwegian', 'no'),
              m.callbackButton('Deutsch', 'de'),
            ],
            [m.callbackButton('Taiwan', 'tw')],
          ])
        )
    )
  })

  bot.action(
    ['en', 'ru', 'it', 'et', 'uk', 'br', 'tr', 'ruen', 'es', 'zh', 'no', 'de', 'tw'],
    checkIfFromReplier,
    async ctx => {
      let chat = ctx.dbchat
      chat.language = ctx.callbackQuery.data as Language
      chat = await chat.save()
      const message = ctx.callbackQuery.message

      ctx.telegram.editMessageText(
        message.chat.id,
        message.message_id,
        undefined,
        strings(chat, 'language_selected')
      )
    }
  )
}

// Dependencies
import { Telegraf, ContextMessageUpdate, Extra } from 'telegraf'
import { strings } from '../helpers/strings'
import { Language } from '../models'
import { checkIfFromReplier } from '../middlewares/checkIfFromReplier'
import { checkLock } from '../middlewares/checkLock'

export function setupLanguage(bot: Telegraf<ContextMessageUpdate>) {
  bot.command('language', checkLock, (ctx) => {
    ctx.replyWithMarkdown(
      strings(ctx.dbchat, 'language'),
      Extra.webPreview(false)
        .inReplyTo(ctx.message.message_id)
        .markup((m) =>
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
              m.callbackButton('Español', 'es'),
              m.callbackButton('Chinese', 'zh'),
            ],
            [
              m.callbackButton('Norwegian', 'no'),
              m.callbackButton('Deutsch', 'de'),
            ],
            [
              m.callbackButton('Taiwan', 'tw'),
              m.callbackButton('French', 'fr'),
            ],
            [
              m.callbackButton('Indonesian', 'id'),
              m.callbackButton('Korean', 'ko'),
            ],
            [
              m.callbackButton('Amharic', 'am'),
              m.callbackButton('Czech', 'cz'),
            ],
            [
              m.callbackButton('Arabic', 'ar'),
              m.callbackButton('Türkçe', 'tr'),
            ],
            [
              m.callbackButton('Romanian', 'ro'),
              m.callbackButton('Japanese', 'ja'),
            ],
            [
              m.callbackButton('Slovak', 'sk'),
              m.callbackButton('Catalan', 'ca'),
            ],
          ])
        )
    )
  })

  bot.action(
    [
      'en',
      'ru',
      'it',
      'et',
      'uk',
      'br',
      'tr',
      'es',
      'zh',
      'no',
      'de',
      'tw',
      'fr',
      'id',
      'ko',
      'am',
      'cz',
      'ar',
      'ja',
      'ro',
      'sk',
      'ca',
    ],
    checkIfFromReplier,
    async (ctx) => {
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

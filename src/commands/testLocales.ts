// Dependencies
import { Telegraf, ContextMessageUpdate, Extra } from 'telegraf'
import { ExtraReplyMessage } from 'telegraf/typings/telegram-types'
import { Chat } from '../models'

export function setupTestLocales(bot: Telegraf<ContextMessageUpdate>) {
  bot.command('testLocales', async ctx => {
    if (ctx.from.id !== 76104711) {
      return
    }
    const { strings, localizations } = require('../helpers/strings')

    for (const key of Object.keys(localizations)) {
      const value = localizations[key]

      for (const locale of Object.keys(value)) {
        try {
          await ctx.reply(
            strings({ language: locale } as Chat, key),
            Extra.markdown(true) as ExtraReplyMessage
          )
        } catch (err) {
          console.error(key, locale, err.message)
        }
      }
    }
    console.log('Done')
    return ctx.reply('Done')
  })
}

// Dependencies
import { Telegraf, ContextMessageUpdate } from 'telegraf'
import { strings } from '../helpers/strings'

export function setupHelp(bot: Telegraf<ContextMessageUpdate>) {
  bot.command(['help', 'start'], ctx => {
    ctx.replyWithMarkdown(strings(ctx.dbchat, 'help'), {
      disable_web_page_preview: true,
    })
  })
}

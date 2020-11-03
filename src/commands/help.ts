import { Telegraf, Context } from 'telegraf'
import { strings } from '@helpers/strings'
import { checkLock } from '@middlewares/checkLock'

export function setupHelp(bot: Telegraf<Context>) {
  bot.command(['help', 'start'], checkLock, sendHelp)
}

export function sendHelp(ctx: Context) {
  return ctx.replyWithMarkdown(strings(ctx.dbchat, 'helpShieldy'), {
    disable_web_page_preview: true,
  })
}

export function sendHelpSafe(ctx: Context) {
  try {
    return ctx.replyWithMarkdown(strings(ctx.dbchat, 'helpShieldy'), {
      disable_web_page_preview: true,
    })
  } catch {
    // Do nothing
  }
}

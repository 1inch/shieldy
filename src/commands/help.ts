import { Telegraf, Context } from 'telegraf'
import { strings } from '@helpers/strings'
import { checkLock } from '@middlewares/checkLock'
import { clarifyIfPrivateMessages } from '@helpers/clarifyIfPrivateMessages'

export function setupHelp(bot: Telegraf<Context>) {
  bot.command(['help', 'start'], checkLock, clarifyIfPrivateMessages, sendHelp)
}

export function sendHelp(ctx: Context) {
  if (ctx.update.message?.date) {
    console.log(
      'Replying to help',
      Date.now() / 1000 - ctx.update.message?.date
    )
  }
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

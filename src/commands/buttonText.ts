// Dependencies
import { Telegraf, ContextMessageUpdate, Extra } from 'telegraf'
import { strings } from '../helpers/strings'
import { checkLock } from '../middlewares/checkLock'

export function setupButtonText(bot: Telegraf<ContextMessageUpdate>) {
  bot.command('buttonText', checkLock, async ctx => {
    const text = ctx.message.text.substr(12)
    if (!text) {
      ctx.dbchat.buttonText = undefined
    } else {
      ctx.dbchat.buttonText = text
    }
    await ctx.dbchat.save()
    await ctx.replyWithMarkdown(
      strings(ctx.dbchat, 'trust_success'),
      Extra.inReplyTo(ctx.message.message_id)
    )
  })
}

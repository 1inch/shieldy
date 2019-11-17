// Dependencies
import { Telegraf, ContextMessageUpdate, Extra } from 'telegraf'
import { strings } from '../helpers/strings'
import { checkLock } from '../middlewares/checkLock'

export function setupCAS(bot: Telegraf<ContextMessageUpdate>) {
  bot.command('cas', checkLock, async ctx => {
    let chat = ctx.dbchat
    chat.cas = !chat.cas
    chat = await chat.save()
    ctx.replyWithMarkdown(
      strings(ctx.dbchat, chat.cas ? 'cas_true' : 'cas_false'),
      Extra.inReplyTo(ctx.message.message_id)
    )
  })
}

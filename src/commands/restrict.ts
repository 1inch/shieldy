// Dependencies
import { Telegraf, ContextMessageUpdate, Extra } from 'telegraf'
import { strings } from '../helpers/strings'
import { checkLock } from '../middlewares/checkLock'

export function setupRestrict(bot: Telegraf<ContextMessageUpdate>) {
  bot.command('restrict', checkLock, async ctx => {
    let chat = ctx.dbchat
    chat.restrict = !chat.restrict
    chat = await chat.save()
    ctx.replyWithMarkdown(
      strings(ctx.dbchat, chat.restrict ? 'restrict_true' : 'restrict_false'),
      Extra.inReplyTo(ctx.message.message_id)
    )
  })
}

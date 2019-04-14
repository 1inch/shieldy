// Dependencies
import { Telegraf, ContextMessageUpdate, Extra } from 'telegraf'
import { strings } from '../helpers/strings'
import { checkLock } from '../middlewares/checkLock'

export function setupLock(bot: Telegraf<ContextMessageUpdate>) {
  bot.command('lock', checkLock, async ctx => {
    let chat = ctx.dbchat
    chat.adminLocked = !chat.adminLocked
    chat = await chat.save()
    ctx.replyWithMarkdown(
      strings(ctx.dbchat, chat.adminLocked ? 'lock_true' : 'lock_false'),
      Extra.inReplyTo(ctx.message.message_id)
    )
  })
}

// Dependencies
import { Telegraf, ContextMessageUpdate, Extra } from 'telegraf'
import { strings } from '../helpers/strings'
import { checkLock } from '../middlewares/checkLock'

export function setupDeleteEntryOnBan(bot: Telegraf<ContextMessageUpdate>) {
  bot.command('deleteEntryOnBan', checkLock, async ctx => {
    let chat = ctx.dbchat
    chat.deleteEntryOnBan = !chat.deleteEntryOnBan
    chat = await chat.save()
    ctx.replyWithMarkdown(
      strings(
        ctx.dbchat,
        chat.deleteEntryOnBan
          ? 'deleteEntryOnBan_true'
          : 'deleteEntryOnBan_false'
      ),
      Extra.inReplyTo(ctx.message.message_id)
    )
  })
}

import { Telegraf, Context, Extra } from 'telegraf'
import { strings } from '@helpers/strings'
import { checkLock } from '@middlewares/checkLock'

export function setupDeleteEntryMessages(bot: Telegraf<Context>) {
  bot.command('deleteEntryMessages', checkLock, async (ctx) => {
    let chat = ctx.dbchat
    chat.deleteEntryMessages = !chat.deleteEntryMessages
    chat = await chat.save()
    ctx.replyWithMarkdown(
      strings(
        ctx.dbchat,
        chat.deleteEntryMessages
          ? 'deleteEntryMessages_true'
          : 'deleteEntryMessages_false'
      ),
      Extra.inReplyTo(ctx.message.message_id)
    )
  })
}

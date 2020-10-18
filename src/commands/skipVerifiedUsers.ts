import { Telegraf, ContextMessageUpdate, Extra } from 'telegraf'
import { strings } from '@helpers/strings'
import { checkLock } from '@middlewares/checkLock'

export function setupSkipVerifiedUsers(bot: Telegraf<ContextMessageUpdate>) {
  bot.command('skipVerifiedUsers', checkLock, async (ctx) => {
    let chat = ctx.dbchat
    chat.skipVerifiedUsers = !chat.skipVerifiedUsers
    chat = await chat.save()
    ctx.replyWithMarkdown(
      strings(
        ctx.dbchat,
        chat.skipVerifiedUsers
          ? 'skipVerifiedUsers_true'
          : 'skipVerifiedUsers_false'
      ),
      Extra.inReplyTo(ctx.message.message_id)
    )
  })
}

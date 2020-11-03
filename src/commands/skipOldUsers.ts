import { Telegraf, Context, Extra } from 'telegraf'
import { strings } from '@helpers/strings'
import { checkLock } from '@middlewares/checkLock'

export function setupSkipOldUsers(bot: Telegraf<Context>) {
  bot.command('skipOldUsers', checkLock, async (ctx) => {
    let chat = ctx.dbchat
    chat.skipOldUsers = !chat.skipOldUsers
    chat = await chat.save()
    ctx.replyWithMarkdown(
      strings(
        ctx.dbchat,
        chat.skipOldUsers ? 'skipOldUsers_true' : 'skipOldUsers_false'
      ),
      Extra.inReplyTo(ctx.message.message_id)
    )
  })
}

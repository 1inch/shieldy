import { Telegraf, Context, Extra } from 'telegraf'
import { strings } from '@helpers/strings'
import { checkLock } from '@middlewares/checkLock'

export function setupBanUsers(bot: Telegraf<Context>) {
  bot.command('banUsers', checkLock, async (ctx) => {
    let chat = ctx.dbchat
    chat.banUsers = !chat.banUsers
    chat = await chat.save()
    ctx.replyWithMarkdown(
      strings(ctx.dbchat, chat.banUsers ? 'banUsers_true' : 'banUsers_false'),
      Extra.inReplyTo(ctx.message.message_id)
    )
  })
}

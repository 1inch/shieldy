import { clarifyIfPrivateMessages } from '@helpers/clarifyIfPrivateMessages'
import { saveChatProperty } from '@helpers/saveChatProperty'
import { Telegraf, Context, Extra } from 'telegraf'
import { strings } from '@helpers/strings'
import { checkLock } from '@middlewares/checkLock'

export function setupBanUsers(bot: Telegraf<Context>) {
  bot.command('banUsers', checkLock, clarifyIfPrivateMessages, async (ctx) => {
    let chat = ctx.dbchat
    chat.banUsers = !chat.banUsers
    await saveChatProperty(chat, 'banUsers')
    ctx.replyWithMarkdown(
      strings(ctx.dbchat, chat.banUsers ? 'banUsers_true' : 'banUsers_false'),
      Extra.inReplyTo(ctx.message.message_id)
    )
  })
}

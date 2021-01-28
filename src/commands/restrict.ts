import { clarifyIfPrivateMessages } from '@helpers/clarifyIfPrivateMessages'
import { saveChatProperty } from '@helpers/saveChatProperty'
import { Telegraf, Context, Extra } from 'telegraf'
import { strings } from '@helpers/strings'
import { checkLock } from '@middlewares/checkLock'

export function setupRestrict(bot: Telegraf<Context>) {
  bot.command('restrict', checkLock, clarifyIfPrivateMessages, async (ctx) => {
    let chat = ctx.dbchat
    chat.restrict = !chat.restrict
    await saveChatProperty(chat, 'restrict')
    ctx.replyWithMarkdown(
      strings(ctx.dbchat, chat.restrict ? 'restrict_true' : 'restrict_false'),
      Extra.inReplyTo(ctx.message.message_id)
    )
  })
}

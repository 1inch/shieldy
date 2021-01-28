import { clarifyIfPrivateMessages } from '@helpers/clarifyIfPrivateMessages'
import { saveChatProperty } from '@helpers/saveChatProperty'
import { Telegraf, Context, Extra } from 'telegraf'
import { strings } from '@helpers/strings'
import { checkLock } from '@middlewares/checkLock'

export function setupCAS(bot: Telegraf<Context>) {
  bot.command('cas', checkLock, clarifyIfPrivateMessages, async (ctx) => {
    let chat = ctx.dbchat
    chat.cas = !chat.cas
    await saveChatProperty(chat, 'cas')
    ctx.replyWithMarkdown(
      strings(ctx.dbchat, chat.cas ? 'cas_true' : 'cas_false'),
      Extra.inReplyTo(ctx.message.message_id)
    )
  })
}

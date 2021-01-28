import { clarifyIfPrivateMessages } from '@helpers/clarifyIfPrivateMessages'
import { saveChatProperty } from '@helpers/saveChatProperty'
import { Telegraf, Context, Extra } from 'telegraf'
import { strings } from '@helpers/strings'
import { checkLock } from '@middlewares/checkLock'

export function setupStrict(bot: Telegraf<Context>) {
  bot.command('strict', checkLock, clarifyIfPrivateMessages, async (ctx) => {
    let chat = ctx.dbchat
    chat.strict = !chat.strict
    await saveChatProperty(chat, 'strict')
    ctx.replyWithMarkdown(
      strings(ctx.dbchat, chat.strict ? 'strict_true' : 'strict_false'),
      Extra.inReplyTo(ctx.message.message_id)
    )
  })
}

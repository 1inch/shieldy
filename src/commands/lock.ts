import { clarifyIfPrivateMessages } from '@helpers/clarifyIfPrivateMessages'
import { saveChatProperty } from '@helpers/saveChatProperty'
import { Telegraf, Context, Extra } from 'telegraf'
import { strings } from '@helpers/strings'
import { checkLock } from '@middlewares/checkLock'

export function setupLock(bot: Telegraf<Context>) {
  bot.command('lock', checkLock, clarifyIfPrivateMessages, async (ctx) => {
    let chat = ctx.dbchat
    chat.adminLocked = !chat.adminLocked
    await saveChatProperty(chat, 'adminLocked')
    ctx.replyWithMarkdown(
      strings(
        ctx.dbchat,
        chat.adminLocked ? 'lock_true_shieldy' : 'lock_false_shieldy'
      ),
      Extra.inReplyTo(ctx.message.message_id)
    )
  })
}

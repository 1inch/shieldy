import { clarifyIfPrivateMessages } from '@helpers/clarifyIfPrivateMessages'
import { saveChatProperty } from '@helpers/saveChatProperty'
import { Telegraf, Context, Extra } from 'telegraf'
import { strings } from '@helpers/strings'
import { checkLock } from '@middlewares/checkLock'

export function setupNoAttack(bot: Telegraf<Context>) {
  bot.command('noAttack', checkLock, clarifyIfPrivateMessages, async (ctx) => {
    ctx.dbchat.noAttack = !ctx.dbchat.noAttack
    await saveChatProperty(ctx.dbchat, 'noAttack')
    ctx.replyWithMarkdown(
      strings(
        ctx.dbchat,
        ctx.dbchat.noAttack ? 'noAttack_true' : 'noAttack_false'
      ),
      Extra.inReplyTo(ctx.message.message_id)
    )
  })
}

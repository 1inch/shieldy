import { clarifyIfPrivateMessages } from '@helpers/clarifyIfPrivateMessages'
import { saveChatProperty } from '@helpers/saveChatProperty'
import { Telegraf, Context, Extra } from 'telegraf'
import { strings } from '@helpers/strings'
import { checkLock } from '@middlewares/checkLock'

export function setupUnderAttack(bot: Telegraf<Context>) {
  bot.command(
    'underAttack',
    checkLock,
    clarifyIfPrivateMessages,
    async (ctx) => {
      ctx.dbchat.underAttack = !ctx.dbchat.underAttack
      await saveChatProperty(ctx.dbchat, 'underAttack')
      ctx.replyWithMarkdown(
        strings(
          ctx.dbchat,
          ctx.dbchat.underAttack ? 'underAttack_true' : 'underAttack_false'
        ),
        Extra.inReplyTo(ctx.message.message_id)
      )
    }
  )
}

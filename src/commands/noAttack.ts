import { Telegraf, Context, Extra } from 'telegraf'
import { strings } from '@helpers/strings'
import { checkLock } from '@middlewares/checkLock'

export function setupNoAttack(bot: Telegraf<Context>) {
  bot.command('noAttack', checkLock, async (ctx) => {
    ctx.dbchat.noAttack = !ctx.dbchat.noAttack
    ctx.dbchat = await ctx.dbchat.save()
    ctx.replyWithMarkdown(
      strings(
        ctx.dbchat,
        ctx.dbchat.noAttack ? 'noAttack_true' : 'noAttack_false'
      ),
      Extra.inReplyTo(ctx.message.message_id)
    )
  })
}

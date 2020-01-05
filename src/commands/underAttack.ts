// Dependencies
import { Telegraf, ContextMessageUpdate, Extra } from 'telegraf'
import { strings } from '../helpers/strings'
import { checkLock } from '../middlewares/checkLock'

export function setupUnderAttack(bot: Telegraf<ContextMessageUpdate>) {
  bot.command('underAttack', checkLock, async ctx => {
    ctx.dbchat.underAttack = !ctx.dbchat.underAttack
    ctx.dbchat = await ctx.dbchat.save()
    ctx.replyWithMarkdown(
      strings(
        ctx.dbchat,
        ctx.dbchat.underAttack ? 'underAttack_true' : 'underAttack_false'
      ),
      Extra.inReplyTo(ctx.message.message_id)
    )
  })
}

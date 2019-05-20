// Dependencies
import { Telegraf, ContextMessageUpdate, Extra } from 'telegraf'
import { strings } from '../helpers/strings'
import { checkLock } from '../middlewares/checkLock'

export function setupStrict(bot: Telegraf<ContextMessageUpdate>) {
  bot.command('strict', checkLock, async ctx => {
    let chat = ctx.dbchat
    chat.strict = !chat.strict
    chat = await chat.save()
    ctx.replyWithMarkdown(
      strings(ctx.dbchat, chat.strict ? 'strict_true' : 'strict_false'),
      Extra.inReplyTo(ctx.message.message_id)
    )
  })
}

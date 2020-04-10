// Dependencies
import { Telegraf, ContextMessageUpdate, Extra } from 'telegraf'
import { strings } from '../helpers/strings'
import { checkLock } from '../middlewares/checkLock'

export function setupAllowInvitingBots(bot: Telegraf<ContextMessageUpdate>) {
  bot.command('allowInvitingBots', checkLock, async ctx => {
    let chat = ctx.dbchat
    chat.allowInvitingBots = !chat.allowInvitingBots
    chat = await chat.save()
    ctx.replyWithMarkdown(
      strings(ctx.dbchat, chat.allowInvitingBots ? 'allowInvitingBots_true' : 'allowInvitingBots_false'),
      Extra.inReplyTo(ctx.message.message_id)
    )
  })
}

import { Telegraf, Context, Extra } from 'telegraf'
import { strings } from '@helpers/strings'
import { checkLock } from '@middlewares/checkLock'
import { saveChatProperty } from '@helpers/saveChatProperty'

export function setupAllowInvitingBots(bot: Telegraf<Context>) {
  bot.command('allowInvitingBots', checkLock, async (ctx) => {
    let chat = ctx.dbchat
    chat.allowInvitingBots = !chat.allowInvitingBots
    await saveChatProperty(chat, 'allowInvitingBots')
    ctx.replyWithMarkdown(
      strings(
        ctx.dbchat,
        chat.allowInvitingBots
          ? 'allowInvitingBots_true'
          : 'allowInvitingBots_false'
      ),
      Extra.inReplyTo(ctx.message.message_id)
    )
  })
}

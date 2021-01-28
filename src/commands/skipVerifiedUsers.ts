import { clarifyIfPrivateMessages } from '@helpers/clarifyIfPrivateMessages'
import { saveChatProperty } from '@helpers/saveChatProperty'
import { Telegraf, Context, Extra } from 'telegraf'
import { strings } from '@helpers/strings'
import { checkLock } from '@middlewares/checkLock'

export function setupSkipVerifiedUsers(bot: Telegraf<Context>) {
  bot.command(
    'skipVerifiedUsers',
    checkLock,
    clarifyIfPrivateMessages,
    async (ctx) => {
      let chat = ctx.dbchat
      chat.skipVerifiedUsers = !chat.skipVerifiedUsers
      await saveChatProperty(chat, 'skipVerifiedUsers')
      ctx.replyWithMarkdown(
        strings(
          ctx.dbchat,
          chat.skipVerifiedUsers
            ? 'skipVerifiedUsers_true'
            : 'skipVerifiedUsers_false'
        ),
        Extra.inReplyTo(ctx.message.message_id)
      )
    }
  )
}

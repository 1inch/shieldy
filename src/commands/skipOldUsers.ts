import { clarifyIfPrivateMessages } from '@helpers/clarifyIfPrivateMessages'
import { saveChatProperty } from '@helpers/saveChatProperty'
import { Telegraf, Context, Extra } from 'telegraf'
import { strings } from '@helpers/strings'
import { checkLock } from '@middlewares/checkLock'

export function setupSkipOldUsers(bot: Telegraf<Context>) {
  bot.command(
    'skipOldUsers',
    checkLock,
    clarifyIfPrivateMessages,
    async (ctx) => {
      let chat = ctx.dbchat
      chat.skipOldUsers = !chat.skipOldUsers
      await saveChatProperty(chat, 'skipOldUsers')
      ctx.replyWithMarkdown(
        strings(
          ctx.dbchat,
          chat.skipOldUsers ? 'skipOldUsers_true' : 'skipOldUsers_false'
        ),
        Extra.inReplyTo(ctx.message.message_id)
      )
    }
  )
}

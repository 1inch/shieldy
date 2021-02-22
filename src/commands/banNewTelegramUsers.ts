import { clarifyIfPrivateMessages } from '@helpers/clarifyIfPrivateMessages'
import { saveChatProperty } from '@helpers/saveChatProperty'
import { Telegraf, Context, Extra } from 'telegraf'
import { strings } from '@helpers/strings'
import { checkLock } from '@middlewares/checkLock'

export function setupBanNewTelegramUsers(bot: Telegraf<Context>) {
  bot.command(
    'banNewTelegramUsers',
    checkLock,
    clarifyIfPrivateMessages,
    async (ctx) => {
      let chat = ctx.dbchat
      chat.banNewTelegramUsers = !chat.banNewTelegramUsers
      await saveChatProperty(chat, 'banNewTelegramUsers')
      ctx.replyWithMarkdown(
        strings(
          ctx.dbchat,
          chat.banNewTelegramUsers
            ? 'banNewTelegramUsers_true'
            : 'banNewTelegramUsers_false'
        ),
        Extra.inReplyTo(ctx.message.message_id)
      )
    }
  )
}

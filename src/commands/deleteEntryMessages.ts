import { clarifyIfPrivateMessages } from '@helpers/clarifyIfPrivateMessages'
import { saveChatProperty } from '@helpers/saveChatProperty'
import { Telegraf, Context, Extra } from 'telegraf'
import { strings } from '@helpers/strings'
import { checkLock } from '@middlewares/checkLock'

export function setupDeleteEntryMessages(bot: Telegraf<Context>) {
  bot.command(
    'deleteEntryMessages',
    checkLock,
    clarifyIfPrivateMessages,
    async (ctx) => {
      let chat = ctx.dbchat
      chat.deleteEntryMessages = !chat.deleteEntryMessages
      await saveChatProperty(chat, 'deleteEntryMessages')
      ctx.replyWithMarkdown(
        strings(
          ctx.dbchat,
          chat.deleteEntryMessages
            ? 'deleteEntryMessages_true'
            : 'deleteEntryMessages_false'
        ),
        Extra.inReplyTo(ctx.message.message_id)
      )
    }
  )
}

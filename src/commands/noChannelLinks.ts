import { clarifyIfPrivateMessages } from '@helpers/clarifyIfPrivateMessages'
import { saveChatProperty } from '@helpers/saveChatProperty'
import { Telegraf, Context, Extra } from 'telegraf'
import { strings } from '@helpers/strings'
import { checkLock } from '@middlewares/checkLock'

export function setupNoChannelLinks(bot: Telegraf<Context>) {
  bot.command(
    'noChannelLinks',
    checkLock,
    clarifyIfPrivateMessages,
    async (ctx) => {
      let chat = ctx.dbchat
      chat.noChannelLinks = !chat.noChannelLinks
      await saveChatProperty(chat, 'noChannelLinks')
      await saveChatProperty(chat, '')
      ctx.replyWithMarkdown(
        strings(
          ctx.dbchat,
          chat.noChannelLinks ? 'noChannelLinks_true' : 'noChannelLinks_false'
        ),
        Extra.inReplyTo(ctx.message.message_id)
      )
    }
  )
}

import { clarifyIfPrivateMessages } from '@helpers/clarifyIfPrivateMessages'
import { saveChatProperty } from '@helpers/saveChatProperty'
import { Telegraf, Context, Extra } from 'telegraf'
import { checkLock } from '@middlewares/checkLock'
import { strings } from '@helpers/strings'
import { ExtraReplyMessage } from 'telegraf/typings/telegram-types'

export function setupRestrictTime(bot: Telegraf<Context>) {
  bot.command(
    'restrictTime',
    checkLock,
    clarifyIfPrivateMessages,
    async (ctx) => {
      // Check if limit is set
      const limitNumber =
        +ctx.message.text.substr('/restrictTime'.length).trim() ||
        +ctx.message.text
          .substr(
            '/restrictTime@'.length + (bot as any).botInfo.username.length
          )
          .trim()
      if (!isNaN(limitNumber) && limitNumber > 0 && limitNumber < 745) {
        // roughly 31 days
        ctx.dbchat.restrictTime = limitNumber
        await saveChatProperty(ctx.dbchat, 'restrictTime')
        ctx.reply(
          strings(ctx.dbchat, 'greetsUsers_message_accepted'),
          Extra.inReplyTo(ctx.message.message_id) as ExtraReplyMessage
        )
      } else {
        ctx.dbchat.restrictTime = 24
        await saveChatProperty(ctx.dbchat, 'restrictTime')
        ctx.reply(
          `${strings(ctx.dbchat, 'greetsUsers_message_accepted')} 0`,
          Extra.inReplyTo(ctx.message.message_id) as ExtraReplyMessage
        )
      }
    }
  )
}

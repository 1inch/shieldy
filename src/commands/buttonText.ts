import { clarifyIfPrivateMessages } from '@helpers/clarifyIfPrivateMessages'
import { saveChatProperty } from '@helpers/saveChatProperty'
import { Telegraf, Context, Extra } from 'telegraf'
import { strings } from '@helpers/strings'
import { checkLock } from '@middlewares/checkLock'

export function setupButtonText(bot: Telegraf<Context>) {
  bot.command(
    'buttonText',
    checkLock,
    clarifyIfPrivateMessages,
    async (ctx) => {
      const text = ctx.message.text.substr(12)
      if (!text) {
        ctx.dbchat.buttonText = undefined
      } else {
        ctx.dbchat.buttonText = text
      }
      await saveChatProperty(ctx.dbchat, 'buttonText')
      await ctx.replyWithMarkdown(
        strings(ctx.dbchat, 'trust_success'),
        Extra.inReplyTo(ctx.message.message_id)
      )
    }
  )
}

// Dependencies
import { Telegraf, ContextMessageUpdate, Extra } from 'telegraf'
import { checkLock } from '../middlewares/checkLock'
import { strings } from '../helpers/strings'
import { ExtraReplyMessage } from 'telegraf/typings/telegram-types'

export function setupDeleteGreetingTime(bot: Telegraf<ContextMessageUpdate>) {
  bot.command('deleteGreetingTime', checkLock, async ctx => {
    // Check if limit is set
    const limitNumber =
      +ctx.message.text.substr(19).trim() ||
      +ctx.message.text.substr(20 + (bot as any).options.username.length).trim()
    if (!isNaN(limitNumber) && limitNumber > 0 && limitNumber < 100000) {
      ctx.dbchat.deleteGreetingTime = limitNumber
      await ctx.dbchat.save()
      ctx.reply(
        strings(ctx.dbchat, 'greetsUsers_message_accepted'),
        Extra.inReplyTo(ctx.message.message_id) as ExtraReplyMessage
      )
    } else {
      ctx.dbchat.deleteGreetingTime = undefined
      await ctx.dbchat.save()
      ctx.reply(
        `${strings(ctx.dbchat, 'greetsUsers_message_accepted')} 0`,
        Extra.inReplyTo(ctx.message.message_id) as ExtraReplyMessage
      )
    }
  })
}

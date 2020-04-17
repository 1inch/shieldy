// Dependencies
import { Telegraf, ContextMessageUpdate } from 'telegraf'
import { checkSuperAdmin } from '../middlewares/checkSuperAdmin'

export function setupDelete(bot: Telegraf<ContextMessageUpdate>) {
  bot.command('delete', checkSuperAdmin, async (ctx) => {
    if (
      !ctx ||
      !ctx.message ||
      !ctx.message.reply_to_message ||
      !ctx.message.reply_to_message.message_id
    ) {
      return
    }
    await ctx.telegram.deleteMessage(
      ctx.chat.id,
      ctx.message.reply_to_message.message_id
    )
    await ctx.deleteMessage()
  })
}

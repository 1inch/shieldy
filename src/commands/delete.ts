// Dependencies
import { Telegraf, ContextMessageUpdate } from 'telegraf'

export function setupDelete(bot: Telegraf<ContextMessageUpdate>) {
  bot.command('delete', async (ctx) => {
    if (ctx.from.id !== parseInt(process.env.ADMIN, 10)) {
      return
    }
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

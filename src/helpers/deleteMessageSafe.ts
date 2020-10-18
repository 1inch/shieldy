import { bot } from '@helpers/bot'
import { ContextMessageUpdate } from 'telegraf'

export async function deleteMessageSafe(ctx: ContextMessageUpdate) {
  try {
    await ctx.deleteMessage()
  } catch {
    // Do nothing
  }
}

export async function deleteMessageSafeWithBot(
  chatId: number,
  messageId: number
) {
  try {
    await bot.telegram.deleteMessage(chatId, messageId)
  } catch {
    // Do nothing
  }
}

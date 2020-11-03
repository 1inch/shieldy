import { report } from '@helpers/report'
import { bot } from '@helpers/bot'
import { Context } from 'telegraf'

export async function deleteMessageSafe(ctx: Context) {
  try {
    await ctx.deleteMessage()
  } catch (err) {
    report(err)
  }
}

export async function deleteMessageSafeWithBot(
  chatId: number,
  messageId: number
) {
  try {
    await bot.telegram.deleteMessage(chatId, messageId)
  } catch (err) {
    report(err)
  }
}

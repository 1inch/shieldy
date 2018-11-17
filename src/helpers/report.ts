// Dependencies
import Telegraf, { ContextMessageUpdate } from 'Telegraf'

export function report(bot: Telegraf<ContextMessageUpdate>, error: Error) {
  const adminChatId = process.env.ADMIN
  if (!adminChatId) return
  bot.telegram.sendMessage(
    adminChatId,
    `\`\`\`${JSON.stringify(error)}\`\`\``,
    {
      parse_mode: 'Markdown',
    } as any
  )
}

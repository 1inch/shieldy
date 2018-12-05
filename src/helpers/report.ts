// Dependencies
import Telegraf, { ContextMessageUpdate } from 'telegraf'
import { checkIfErrorDismissable } from './error'

export function report(bot: Telegraf<ContextMessageUpdate>, error: Error) {
  if (checkIfErrorDismissable(error)) {
    return
  }
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

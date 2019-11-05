// Dependencies
import Telegraf, { ContextMessageUpdate } from 'telegraf'
import { checkIfErrorDismissable } from './error'

export async function report(
  bot: Telegraf<ContextMessageUpdate>,
  error: Error
) {
  if (checkIfErrorDismissable(error)) {
    return
  }
  const adminChatId = process.env.ADMIN
  if (!adminChatId) return
  try {
    await bot.telegram.sendMessage(
      adminChatId,
      `<code>${error.message}</code>\n\n<code>${
        error.stack
      }</code>\n\n${error as any}`,
      {
        parse_mode: 'HTML',
      } as any
    )
  } catch (err) {
    console.error(err)
  }
}

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
      `<code>${error.message}</code>\n\n<code>${error.stack}</code>\n\n<code>${
        (error as any).response
      }</code>\n\n<code>${JSON.stringify(
        (error as any).parameters,
        undefined,
        2
      )}</code>`,
      {
        parse_mode: 'HTML',
      } as any
    )
  } catch (err) {
    console.error(err)
  }
}

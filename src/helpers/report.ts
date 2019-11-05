// Dependencies
import Telegraf, { ContextMessageUpdate } from 'telegraf'
import { checkIfErrorDismissable } from './error'

export async function report(
  bot: Telegraf<ContextMessageUpdate>,
  error: Error,
  ctx?: ContextMessageUpdate
) {
  if (checkIfErrorDismissable(error)) {
    return
  }
  const adminChatId = process.env.ADMIN
  if (!adminChatId) return
  try {
    await bot.telegram.sendMessage(
      adminChatId,
      `<code>${error.message}</code>\n\n<code>${error.stack}</code>${
        ctx
          ? `${JSON.stringify(
              ctx.message ||
                ctx.channelPost ||
                ctx.inlineQuery ||
                ctx.callbackQuery,
              undefined,
              2
            )}`
          : ''
      }`,
      {
        parse_mode: 'HTML',
      } as any
    )
  } catch (err) {
    console.error(err)
  }
}

import { Telegraf, Context } from 'telegraf'

type Options = {
  ctx: Context
  bot: Telegraf<Context>
}

export function isReplyToShieldy(options: Options): boolean {
  const { ctx, bot } = options

  // Check if reply
  if (!ctx.message || !ctx.message.reply_to_message) {
    return false
  }
  // Check if reply to shieldy
  if (
    !ctx.message.reply_to_message.from ||
    !ctx.message.reply_to_message.from.username ||
    ctx.message.reply_to_message.from.username !== (bot as any).botInfo.username
  ) {
    return false
  }

  return true
}

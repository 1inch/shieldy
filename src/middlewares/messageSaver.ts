import { Context } from 'telegraf'
import { CappedMessageModel } from '@models/CappedMessage'

export async function messageSaver(ctx: Context, next) {
  try {
    if (
      ctx.update.message?.message_id &&
      ctx.update.message?.from?.id &&
      ctx.update.message?.chat.id
    ) {
      saveMessage(ctx)
    }
  } catch {
    // Do nothing
  }
  return next()
}

async function saveMessage(ctx: Context) {
  await new CappedMessageModel({
    message_id: ctx.update.message.message_id,
    from_id: ctx.update.message.from.id,
    chat_id: ctx.update.message.chat.id,
  }).save() // Do not await
}

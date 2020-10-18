import { CappedMessageModel } from '@models/CappedMessage'

export async function messageSaver(ctx, next) {
  try {
    if (ctx.message?.message_id && ctx.from?.id && ctx.chat?.id) {
      new CappedMessageModel({
        message_id: ctx.message.message_id,
        from_id: ctx.from.id,
        chat_id: ctx.chat.id,
        message: ctx.message,
      }).save() // Do not await
    }
  } catch {
    // Do nothing
  }
  return next()
}

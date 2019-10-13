// Dependencies
import { CappedMessageModel } from '../models'

export async function messageSaver(ctx, next) {
  if (
    ctx.message &&
    ctx.message.message_id &&
    ctx.from &&
    ctx.from.id &&
    ctx.chat &&
    ctx.chat.id
  ) {
    new CappedMessageModel({
      message_id: ctx.message.message_id,
      from_id: ctx.from.id,
      chat_id: ctx.chat.id,
      message: ctx.message,
    }).save() // Do not await
  }
  return next()
}

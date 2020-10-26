import { findChat } from '@models/Chat'
import { ContextMessageUpdate } from 'telegraf'

export async function attachUser(ctx: ContextMessageUpdate, next) {
  // Just drop the update if there is no chat
  if (!ctx.chat) {
    return
  }
  const chat = await findChat(ctx.chat.id)
  ctx.dbchat = chat
  return next()
}

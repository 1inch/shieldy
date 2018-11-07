// Dependencies
import { findChat } from '../models'
import { ContextMessageUpdate } from 'telegraf'

export async function attachUser(ctx: ContextMessageUpdate, next) {
  const chat = await findChat(ctx.chat.id)
  ctx.dbchat = chat
  next()
}

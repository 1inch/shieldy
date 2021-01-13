import { findChat } from '@models/Chat'
import { Context } from 'telegraf'

export async function attachUser(ctx: Context, next) {
  if (ctx.update.message?.date && ctx.update.message?.text === '/help') {
    console.log(
      'Got to attachUser on help',
      Date.now() / 1000 - ctx.update.message?.date
    )
  }
  // Just drop the update if there is no chat
  if (!ctx.chat) {
    return
  }
  const chat = await findChat(ctx.chat.id)
  if (ctx.update.message?.date && ctx.update.message?.text === '/help') {
    console.log(
      'Got to attachUser on help, found user',
      Date.now() / 1000 - ctx.update.message?.date
    )
  }
  ctx.dbchat = chat
  return next()
}

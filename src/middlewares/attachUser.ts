// Dependencies
import { bot } from '../helpers/bot'
import { findChat } from '../models'
import { ContextMessageUpdate } from 'telegraf'
import { report } from '../helpers/report'

export async function attachUser(ctx: ContextMessageUpdate, next) {
  try {
    const chat = await findChat(ctx.chat.id)
    ctx.dbchat = chat
  } catch (err) {
    await report(err)
  }
  next()
}

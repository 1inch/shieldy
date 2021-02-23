import { Context } from 'telegraf'
import { Worker } from 'worker_threads'

export async function messageSaver(ctx: Context, next) {
  try {
    const message = ctx.update.edited_message || ctx.update.message
    if (message && message.message_id && message.from?.id && message.chat.id) {
      if (
        (message.entities && message.entities.length) ||
        (message.caption_entities && message.caption_entities.length) ||
        message.forward_from ||
        message.forward_date ||
        message.forward_from_chat ||
        message.document ||
        message.sticker ||
        message.photo ||
        message.video_note ||
        message.video ||
        message.game
      ) {
        saveMessage(ctx)
      }
    }
  } catch {
    // Do nothing
  }
  return next()
}

const messageSaverWorker = new Worker(__dirname + '/messageSaverWorker.js')

async function saveMessage(ctx: Context) {
  if (ctx.update.message?.new_chat_members) {
    return
  }
  const message = ctx.update.edited_message || ctx.update.message
  messageSaverWorker.postMessage(message)
}

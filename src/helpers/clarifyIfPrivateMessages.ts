import { addMessageToDelete } from '@models/MessageToDelete'
import { strings } from '@helpers/strings'
import { Context } from 'telegraf'

export async function clarifyIfPrivateMessages(ctx: Context, next: Function) {
  if (ctx.chat?.type !== 'private') {
    return next()
  }
  const sent = await ctx.reply(strings(ctx.dbchat, 'commandsInPrivateWarning'))
  const deleteTime = new Date()
  deleteTime.setSeconds(deleteTime.getSeconds() + 30)
  addMessageToDelete(sent.chat.id, sent.message_id, deleteTime)
  return next()
}

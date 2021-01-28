import { addMessageToDelete } from '@models/MessageToDelete'
import { strings } from '@helpers/strings'
import { Context } from 'telegraf'

export async function clarifyReply(ctx: Context) {
  const sent = await ctx.reply(strings(ctx.dbchat, 'thisIsNotAReply'))
  const sent2 = await ctx.reply(strings(ctx.dbchat, 'thisIsAReply'), {
    reply_to_message_id: sent.message_id,
  })
  const deleteTime = new Date()
  deleteTime.setSeconds(deleteTime.getSeconds() + 30)
  addMessageToDelete(sent.chat.id, sent.message_id, deleteTime)
  addMessageToDelete(sent2.chat.id, sent2.message_id, deleteTime)
}

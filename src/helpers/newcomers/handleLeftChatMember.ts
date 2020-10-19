import { ChatModel } from '@models/Chat'
import { deleteMessageSafe } from '@helpers/deleteMessageSafe'
import { kickedIds } from '@helpers/newcomers/kikedIds'
import { ContextMessageUpdate } from 'telegraf'

export async function handleLeftChatMember(ctx: ContextMessageUpdate) {
  // Delete left message if required
  if (
    ctx.dbchat.deleteEntryMessages ||
    ctx.dbchat.underAttack ||
    (ctx.dbchat.deleteEntryOnKick &&
      kickedIds[ctx.dbchat.id].includes(ctx.message.left_chat_member.id))
  ) {
    deleteMessageSafe(ctx)
    return
  }
  if (ctx.dbchat.deleteEntryOnKick) {
    ChatModel.updateOne(
      { _id: ctx.dbchat._id, 'candidates.id': ctx.message.left_chat_member.id },
      { $set: { 'candidates.$.leaveMessageId': ctx.message.message_id } }
    )
  }
}

import { CappedKickedUserModel } from '@models/CappedKickedUser'
import { ChatModel } from '@models/Chat'
import { deleteMessageSafe } from '@helpers/deleteMessageSafe'
import { Context } from 'telegraf'

export async function handleLeftChatMember(ctx: Context) {
  // Check if this user got kicked
  const userWasKicked = !!(await CappedKickedUserModel.findOne({
    chatId: ctx.dbchat.id,
    userId: ctx.message.left_chat_member.id,
  }))
  // Delete left message if required
  if (
    ctx.dbchat.deleteEntryMessages ||
    ctx.dbchat.underAttack ||
    (ctx.dbchat.deleteEntryOnKick && userWasKicked)
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

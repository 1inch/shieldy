import { kickedIds } from '@helpers/newcomers/kikedIds'
import { ContextMessageUpdate } from 'telegraf'
import { report } from '@helpers/report'

export async function handleLeftChatMember(ctx: ContextMessageUpdate) {
  // Delete left message if required
  if (
    ctx.dbchat.deleteEntryMessages ||
    ctx.dbchat.underAttack ||
    (ctx.dbchat.deleteEntryOnKick &&
      kickedIds[ctx.dbchat.id].includes(ctx.message.left_chat_member.id))
  ) {
    try {
      await ctx.deleteMessage()
    } catch (err) {
      await report(err)
    }
  }
  if (ctx.dbchat.deleteEntryOnKick) {
    let needsSaving = false
    for (const candidate of ctx.dbchat.candidates) {
      if (candidate.id === ctx.message.left_chat_member.id) {
        candidate.leaveMessageId = ctx.message.message_id
        needsSaving = true
      }
    }
    if (needsSaving) {
      await ctx.dbchat.save()
    }
  }
}

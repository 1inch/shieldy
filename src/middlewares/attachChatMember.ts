import { report } from '@helpers/report'
import { isGroup } from '@helpers/isGroup'
import { ContextMessageUpdate } from 'telegraf'

export async function attachChatMember(ctx: ContextMessageUpdate, next) {
  // If not a group, no need to get the member
  if (!isGroup(ctx)) {
    ctx.isAdministrator = true
    return next()
  }
  try {
    ctx.chatMember = await ctx.getChatMember(ctx.from.id)
    ctx.isAdministrator = ['creator', 'administrator'].includes(
      ctx.chatMember.status
    )
  } catch (err) {
    ctx.isAdministrator = false
    report(err)
  } finally {
    return next()
  }
}

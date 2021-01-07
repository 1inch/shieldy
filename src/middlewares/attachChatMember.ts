import { report } from '@helpers/report'
import { isGroup } from '@helpers/isGroup'
import { Context } from 'telegraf'

export async function attachChatMember(ctx: Context, next) {
  // If not a group, no need to get the member
  if (!isGroup(ctx)) {
    ctx.isAdministrator = true
    return next()
  }
  try {
    const chatMemberFromTelegram = await ctx.getChatMember(ctx.from.id)
    ctx.isAdministrator = ['creator', 'administrator'].includes(
      chatMemberFromTelegram.status
    )
  } catch (err) {
    // If anything above fails, just assume it's not an admin
    ctx.isAdministrator = false
    report(err)
  } finally {
    return next()
  }
}

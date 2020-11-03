import { isGroup } from '@helpers/isGroup'
import { deleteMessageSafeWithBot } from '@helpers/deleteMessageSafe'
import { Context } from 'telegraf'

export async function checkLock(ctx: Context, next: () => any) {
  // If loccked, private messages or channel, then continue
  if (!ctx.dbchat.adminLocked || !isGroup(ctx)) {
    return next()
  }
  // If super admin, then continue
  if (ctx.from.id === parseInt(process.env.ADMIN)) {
    return next()
  }
  // If from the group anonymous bot, then continue
  if (ctx.from?.username === 'GroupAnonymousBot') {
    return next()
  }
  // If from admin, then continue
  if (ctx.isAdministrator) {
    return next()
  }
  // Otherwise, remove the message
  await deleteMessageSafeWithBot(ctx.chat.id, ctx.message.message_id)
}

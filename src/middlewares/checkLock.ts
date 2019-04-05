import { ContextMessageUpdate } from 'telegraf'

export async function checkLock(ctx: ContextMessageUpdate, next: () => any) {
  if (
    !ctx.dbchat.adminLocked ||
    ctx.chat.type === 'private' ||
    ctx.chat.type === 'channel'
  ) {
    next()
    return
  }
  if (ctx.from.id === parseInt(process.env.ADMIN)) {
    next()
    return
  }
  const admins = await ctx.telegram.getChatAdministrators(ctx.chat.id)
  if (admins.map(m => m.user.id).indexOf(ctx.from.id) > -1) {
    next()
  } else {
    try {
      await ctx.telegram.deleteMessage(ctx.chat.id, ctx.message.message_id)
    } catch (err) {
      // Do nothing
    }
  }
}

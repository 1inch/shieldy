import { ContextMessageUpdate } from 'telegraf'

export async function checkRestrict(
  ctx: ContextMessageUpdate,
  next: () => any
) {
  if (!ctx.dbchat.restrict) {
    next()
    return
  }
  const restrictedUsers = ctx.dbchat.restrictedUsers
  const restricted = restrictedUsers.map(u => u.id).indexOf(ctx.from.id) > -1
  if (
    restricted &&
    ctx.message &&
    ctx.message.entities &&
    ctx.message.entities.length &&
    ctx.message.entities.map(e => e.type).indexOf('url') > -1
  ) {
    try {
      await ctx.telegram.deleteMessage(ctx.chat.id, ctx.message.message_id)
    } catch (err) {
      // Do nothing
    }
  } else {
    next()
  }
}

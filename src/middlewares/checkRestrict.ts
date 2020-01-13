import { ContextMessageUpdate } from 'telegraf'
import { globalyRestricted } from '../helpers/globallyRestricted'
import { report } from '../helpers/report'

export async function checkRestrict(
  ctx: ContextMessageUpdate,
  next: () => any
) {
  const message = ctx.editedMessage || ctx.message
  if (!message) {
    return next()
  }
  if (!ctx.dbchat.restrict) {
    return next()
  }
  if (ctx.from.id === parseInt(process.env.ADMIN)) {
    return next()
  }
  const restrictedUsers = ctx.dbchat.restrictedUsers
  const restricted =
    restrictedUsers.map(u => u.id).indexOf(ctx.from.id) > -1 ||
    globalyRestricted.indexOf(ctx.from.id) > -1
  if (
    restricted &&
    message &&
    ((message.entities && message.entities.length) ||
      (message.caption_entities && message.caption_entities.length) ||
      message.forward_from ||
      message.forward_date ||
      message.forward_from_chat ||
      message.document ||
      message.sticker ||
      message.photo ||
      message.video_note ||
      message.video ||
      message.game)
  ) {
    try {
      await ctx.deleteMessage()
    } catch (err) {
      await report(err)
    }
  } else {
    return next()
  }
}

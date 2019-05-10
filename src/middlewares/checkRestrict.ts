import { ContextMessageUpdate } from 'telegraf'
import { globalyRestricted } from '../helpers/newcomers'
import { report } from '../helpers/report'
import { bot } from '../helpers/bot'

export async function checkRestrict(
  ctx: ContextMessageUpdate,
  next: () => any
) {
  const message = ctx.editedMessage || ctx.message
  if (!message) {
    return next()
  }
  if (!ctx.dbchat.restrict) {
    next()
    return
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
      (message.forward_from ||
        message.forward_date ||
        message.forward_from_chat) ||
      message.document)
  ) {
    try {
      await ctx.telegram.deleteMessage(ctx.chat.id, message.message_id)
    } catch (err) {
      await report(bot, err)
    }
  } else {
    next()
  }
}

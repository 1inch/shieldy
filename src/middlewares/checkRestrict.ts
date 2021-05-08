import { Context } from 'telegraf'
import { isGloballyRestricted } from '@helpers/globallyRestricted'
import { deleteMessageSafe } from '@helpers/deleteMessageSafe'
import { MessageEntity } from 'typegram'

export async function checkRestrict(ctx: Context, next: () => any) {
  if (ctx.update.message?.date && ctx.update.message?.text === '/help') {
    console.log(
      'Got to checkRestrict on help',
      Date.now() / 1000 - ctx.update.message?.date
    )
  }
  // Get the message
  const message = ctx.editedMessage || ctx.message
  // Continue if there is no message
  if (!message) {
    return next()
  }
  // Continue if the restrict is off
  if (!ctx.dbchat.restrict) {
    return next()
  }
  // Don't restrict super admin
  if (ctx.from.id === parseInt(process.env.ADMIN)) {
    return next()
  }
  // Just delete the message if globally restricted
  if (isGloballyRestricted(ctx.from.id)) {
    deleteMessageSafe(ctx)
    return
  }
  // Check if this user is restricted
  const restricted = ctx.dbchat.restrictedUsers
    .map((u) => u.id)
    .includes(ctx.from.id)
  // If a restricted user tries to send restricted type, just delete it
  if (
    restricted &&
    ((message.entities &&
      message.entities.length &&
      entitiesContainMedia(message.entities)) ||
      (message.caption_entities &&
        message.caption_entities.length &&
        entitiesContainMedia(message.caption_entities)) ||
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
    deleteMessageSafe(ctx)
    return
  }
  // Or just continue
  return next()
}

const allowedEntities = [
  'hashtag',
  'cashtag',
  'bold',
  'italic',
  'underline',
  'strikethrough',
]
function entitiesContainMedia(entities: MessageEntity[]) {
  for (const entity of entities) {
    if (!allowedEntities.includes(entity.type)) {
      return true
    }
  }
  return false
}

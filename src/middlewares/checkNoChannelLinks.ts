import { deleteMessageSafe } from '@helpers/deleteMessageSafe'
import { ContextMessageUpdate } from 'telegraf'
import tall from 'tall'

const disallowedUrlParts = ['http://t.me/', 'https://t.me/']

export async function checkNoChannelLinks(
  ctx: ContextMessageUpdate,
  next: Function
) {
  // Get the message
  const message = ctx.editedMessage || ctx.message
  // If there is no message, just continue
  if (!message) {
    return next()
  }
  // If there is no need to check for links, just continue
  if (!ctx.dbchat.noChannelLinks) {
    return next()
  }
  // If sent from private chat or channel, just continue
  if (ctx.chat.type === 'private' || ctx.chat.type === 'channel') {
    return next()
  }
  // If there are no url entities, just continue
  const allEntities = (message.entities || []).concat(
    message.caption_entities || []
  )
  if (
    !allEntities.length ||
    !allEntities.reduce(
      (p, c) => c.type === 'url' || c.type === 'text_link' || p,
      false
    )
  ) {
    return next()
  }
  // If sent from admins, just ignore
  const adminIds = [
    777000,
    parseInt(process.env.ADMIN),
    ...ctx.administrators.map((a) => a.user.id),
  ]
  if (adminIds.includes(ctx.from.id)) {
    return next()
  }
  // Create a placeholder if the message needs deletion
  let needsToBeDeleted = false
  // Check all entities
  for await (let entity of allEntities) {
    // Skip unnecessary entities
    if (entity.type !== 'url' && entity.type !== 'text_link') {
      continue
    }
    // Get url
    let url: string
    if (entity.type == 'text_link' && entity.url) {
      url = entity.url
    } else {
      url = (message.text || message.caption).substring(
        entity.offset,
        entity.offset + entity.length
      )
    }
    // If the link is a telegram link, mark the message for deletion
    if (checkIfUrlIncludesDisallowedParts(url, ctx.chat.username)) {
      needsToBeDeleted = true
      break
    }
    // Try to unshorten the link
    try {
      // Add http just in case
      url =
        url.includes('https://') || url.includes('http://')
          ? url
          : 'http://' + url
      // Unshorten the url
      const unshortenedUrl = await tall(url)
      // If the link is a telegram link, mark the message for deletion
      if (
        checkIfUrlIncludesDisallowedParts(unshortenedUrl, ctx.chat.username)
      ) {
        needsToBeDeleted = true
        break
      }
    } catch (err) {
      // Do nothing
    }
  }
  // If one of the links in the message is a telegram link, delete the message
  if (needsToBeDeleted) {
    deleteMessageSafe(ctx)
    return
  }
  // Or just continue
  return next()
}

function checkIfUrlIncludesDisallowedParts(url: string, chatUsername: string) {
  for (const part of disallowedUrlParts) {
    if (url.includes(part) && !url.includes(`://t.me/${chatUsername}`)) {
      return true
    }
  }
  return false
}

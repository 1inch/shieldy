import { ContextMessageUpdate } from 'telegraf'
import { report } from '../helpers/report'
import { tall } from 'tall'
import { MessageEntity } from 'telegraf/typings/telegram-types'

export async function checkNoChannelLinks(
  ctx: ContextMessageUpdate,
  next: () => any
) {
  const message = ctx.editedMessage || ctx.message
  let markedForDeletion = false
  if (!message) {
    return next()
  }
  if (!ctx.dbchat.noChannelLinks) {
    return next()
  }
  const telegramId = 777000
  if (
    ctx.from.id === telegramId ||
    ctx.from.id === parseInt(process.env.ADMIN) ||
    (ctx.chat.type != 'private' &&
      (await ctx.getChatAdministrators()).filter(
        (admin) => admin.user.id === ctx.from.id
      ).length > 0)
  ) {
    return next()
  }
  // For each of the links contained in the message
  let entities: MessageEntity[] = message.entities
    ? [].concat(message.entities)
    : []
  entities = message.caption_entities
    ? entities.concat(message.caption_entities)
    : entities
  for await (let entity of entities) {
    let url: string
    if (entity.type == 'url' && message.text)
      url = message.text.substring(entity.offset, entity.offset + entity.length)
    else if (entity.type == 'url' && message.caption)
      url = message.caption.substring(
        entity.offset,
        entity.offset + entity.length
      )
    else if (entity.type == 'text_link' && entity.url) url = entity.url

    // If the link is a telegram link, mark the message for deletion
    if (url) {
      try {
        url = url.includes('https://')
          ? url
          : url.includes('http://')
          ? url
          : 'http://' + url
        let unshortenedUrl = await tall(url)
        if (
          unshortenedUrl &&
          (unshortenedUrl.includes('http://t.me/') ||
            unshortenedUrl.includes('https://t.me/')) &&
          ctx.chat.username &&
          !unshortenedUrl.includes('://t.me/' + ctx.chat.username)
        ) {
          markedForDeletion = true
          break
        }
      } catch (err) {
        await report(err)
      }
    }
  }
  //If one of the links in the message is a telegram link, delete the message
  if (markedForDeletion) {
    try {
      await ctx.deleteMessage()
    } catch (err) {
      await report(err)
    }
  } else {
    return next()
  }
}

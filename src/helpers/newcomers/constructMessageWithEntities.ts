import {
  promoAdditionsWithoutHtml,
} from '@helpers/promo'
import { cloneDeep } from 'lodash'
import { Message, User } from 'telegram-typings'

export function constructMessageWithEntities(
  originalMessage: Message,
  user: User,
  tags: { [index: string]: string },
  addPromoText = false,
  language: string = 'en'
) {
  const message = cloneDeep(originalMessage)
  let originalText = message.text
  for (const tag in tags) {
    const tag_value = tags[tag]
    if (!tag_value) {
      continue
    }
    while (originalText.includes(tag)) {
      const tag_offset = originalText.indexOf(tag)

      const tag_length = tag.length
      const tag_value_length = tag_value.length

      // Replace the tag with the value in the message
      originalText = originalText.replace(tag, tag_value)
      // Update the offset of links if it is after the replaced tag
      if (message.entities && message.entities.length) {
        message.entities.forEach((msgEntity) => {
          // Entities after
          if (msgEntity.offset > tag_offset + tag_length) {
            msgEntity.offset = msgEntity.offset - tag_length + tag_value_length
          } else if (
            msgEntity.offset <= tag_offset &&
            msgEntity.offset + msgEntity.length >= tag_offset + tag_length
          ) {
            msgEntity.length += tag_value_length - tag_length
          }
        })
      }
      if (tag === '$username' || tag === '$fullname') {
        if (!message.entities) {
          message.entities = []
        }
        message.entities.push({
          type: 'text_mention',
          offset: tag_offset,
          length: tag_value_length,
          user,
        })
      }
    }
  }
  if (addPromoText) {
    if (!message.entities) {
      message.entities = []
    }
    const promoAddition = promoAdditionsWithoutHtml[language](Math.random())
    message.entities.push(promoAddition.links.map(item => ({
      type: 'text_link',
      offset: `${originalText}\n`.length + item.offset,
      length: item.length,
      url: item.link,
    })))
    originalText = `${originalText}\n${promoAddition.text}`
  }
  message.text = originalText
  return message
}

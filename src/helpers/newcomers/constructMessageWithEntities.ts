import {
  promoAdditionsWithoutHtml,
  promoLinkLengths,
  promoUrl,
} from '@helpers/promo'
import { cloneDeep } from 'lodash'
import { Message, User } from 'telegram-typings'

export function constructMessageWithEntities(
  originalMessage: Message,
  user: User,
  tags: { [index: string]: string },
  addPromoText = false,
  isRuChat?: boolean
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
          if (msgEntity.offset > tag_offset) {
            msgEntity.offset = msgEntity.offset - tag_length + tag_value_length
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
    const language = isRuChat ? 'ru' : 'en'
    if (!message.entities) {
      message.entities = []
    }
    message.entities.push({
      type: 'text_link',
      offset: `${originalText}\n`.length + promoLinkLengths[language]().offset,
      length: promoLinkLengths[language]().length,
      url: promoUrl[language](),
    })
    const promoAddition = promoAdditionsWithoutHtml[language]()
    originalText = `${originalText}\n${promoAddition}`
  }
  message.text = originalText
  return message
}

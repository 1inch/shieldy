import { cloneDeep } from 'lodash'
import { Message } from 'telegram-typings'

export function constructMessageWithEntities(
  originalMessage: Message,
  tags: { [index: string]: string },
  userLink: string
) {
  const message = cloneDeep(originalMessage)
  let originalText = message.text
  for (const tag in tags) {
    while (originalText.includes(tag)) {
      const tag_value = tags[tag]
      const tag_offset = originalText.indexOf(tag)

      const tag_length = lengthOfUnicodeString(tag)
      const tag_value_length = lengthOfUnicodeString(tag_value)

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
          type: 'text_link',
          offset: tag_offset,
          length: tag_value_length,
          url: userLink,
        })
      }
    }
  }
  message.text = originalText
  return message
}

function lengthOfUnicodeString(s: string) {
  return (s.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^]/g) || []).length
}

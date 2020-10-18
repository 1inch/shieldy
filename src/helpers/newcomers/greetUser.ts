import { Message } from 'telegram-typings'
import { isFunction } from 'lodash'
import { User } from 'telegraf/typings/telegram-types'
import { ContextMessageUpdate, Extra } from 'telegraf'
import { constructMessageWithEntities } from '@helpers/newcomers/constructMessageWithEntities'
import { getLink, getName, getUsername } from '@helpers/getUsername'

export async function greetUser(
  ctx: ContextMessageUpdate,
  unsafeUser?: User | Function
) {
  // Get the user (it can be function if used as middleware in telegraf)
  let user =
    unsafeUser && !isFunction(unsafeUser) ? (unsafeUser as User) : ctx.from
  // Check if greeting is required
  if (!ctx.dbchat.greetsUsers || !ctx.dbchat.greetingMessage) {
    return
  }
  // Get marked up message
  const message = constructMessageWithEntities(
    ctx.dbchat.greetingMessage.message,
    {
      $title: (await ctx.getChat()).title,
      $username: getUsername(user),
      $fullname: getName(user),
    },
    getLink(user)
  )
  // Add the @username of the greeted user at the end of the message if no $username was provided
  const originalMessageText = ctx.dbchat.greetingMessage.message.text
  if (
    !originalMessageText.includes('$username') &&
    !originalMessageText.includes('$fullname')
  ) {
    const username = getUsername(user)
    const initialLength = `${message.text}\n\n`.length
    message.text = `${message.text}\n\n${username}`
    if (!message.entities) {
      message.entities = []
    }
    message.entities.push({
      type: 'text_link',
      offset: initialLength,
      length: username.length,
      url: getLink(user),
    })
  }
  // Send the message
  let messageSent: Message
  try {
    messageSent = await ctx.telegram.sendCopy(
      ctx.dbchat.id,
      message,
      ctx.dbchat.greetingButtons
        ? Extra.webPreview(false).markup((m) =>
            m.inlineKeyboard(
              ctx.dbchat.greetingButtons
                .split('\n')
                .map((s) => {
                  const components = s.split(' - ')
                  return m.urlButton(components[0], components[1])
                })
                .map((v) => [v])
            )
          )
        : Extra.webPreview(false)
    )
  } catch (err) {
    message.entities = []
    messageSent = await ctx.telegram.sendCopy(
      ctx.dbchat.id,
      message,
      ctx.dbchat.greetingButtons
        ? Extra.webPreview(false).markup((m) =>
            m.inlineKeyboard(
              ctx.dbchat.greetingButtons
                .split('\n')
                .map((s) => {
                  const components = s.split(' - ')
                  return m.urlButton(components[0], components[1])
                })
                .map((v) => [v])
            )
          )
        : Extra.webPreview(false)
    )
  }

  // Delete greeting message if requested
  if (ctx.dbchat.deleteGreetingTime && messageSent) {
    setTimeout(async () => {
      try {
        await ctx.telegram.deleteMessage(
          messageSent.chat.id,
          messageSent.message_id
        )
      } catch (err) {
        // Do nothing
      }
    }, ctx.dbchat.deleteGreetingTime * 1000)
  }
}

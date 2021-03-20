import { Message } from 'telegram-typings'
import { isFunction } from 'lodash'
import { User } from 'telegraf/typings/telegram-types'
import { Context, Extra } from 'telegraf'
import { constructMessageWithEntities } from '@helpers/newcomers/constructMessageWithEntities'
import { getName, getUsername } from '@helpers/getUsername'
import { addMessageToDelete } from '@models/MessageToDelete'

export async function greetUser(ctx: Context, unsafeUser?: User | Function) {
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
    user,
    {
      $title: (await ctx.getChat()).title,
      $username: getUsername(user),
      $fullname: getName(user),
    }
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
      type: 'text_mention',
      offset: initialLength,
      length: username.length,
      user,
    })
  }
  // Send the message
  let messageSent: Message
  try {
    message.chat = undefined
    messageSent = await ctx.telegram.sendCopy(ctx.dbchat.id, message, {
      ...(ctx.dbchat.greetingButtons
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
        : Extra.webPreview(false)),
      entities: message.entities,
    })
  } catch (err) {
    message.entities = []
    message.chat = undefined
    messageSent = await ctx.telegram.sendCopy(ctx.dbchat.id, message, {
      ...(ctx.dbchat.greetingButtons
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
        : Extra.webPreview(false)),
      entities: message.entities,
    })
  }

  // Delete greeting message if requested
  if (ctx.dbchat.deleteGreetingTime && messageSent) {
    const deleteTime = new Date()
    deleteTime.setSeconds(
      deleteTime.getSeconds() + ctx.dbchat.deleteGreetingTime
    )
    addMessageToDelete(messageSent.chat.id, messageSent.message_id, deleteTime)
  }
}

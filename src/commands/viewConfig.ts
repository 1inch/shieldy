import { clarifyIfPrivateMessages } from '@helpers/clarifyIfPrivateMessages'
import { findChat, Chat } from '@models/Chat'
import { Telegraf, Context, Extra } from 'telegraf'
import { strings } from '@helpers/strings'
import { checkLock } from '@middlewares/checkLock'
import { bot } from '@helpers/bot'

export function setupViewConfig(bot: Telegraf<Context>) {
  bot.command(
    'viewConfig',
    checkLock,
    clarifyIfPrivateMessages,
    async (ctx) => {
      const secondPart = ctx.message.text.split(' ')[1]
      if (secondPart) {
        try {
          let chatId: number | undefined
          if (!isNaN(+secondPart)) {
            chatId = +secondPart
          } else if (secondPart.startsWith('@')) {
            const telegramChat = await ctx.telegram.getChat(secondPart)
            chatId = telegramChat.id
          }
          if (chatId) {
            const chat = await findChat(chatId)
            return sendCurrentConfig(ctx, chat)
          }
        } catch (err) {
          return ctx.reply(strings(ctx.dbchat, 'noChatFound'))
        }
      }
      await sendCurrentConfig(ctx, ctx.dbchat)
    }
  )
}

export async function sendCurrentConfig(ctx: Context, chat: Chat) {
  await ctx.replyWithMarkdown(
    `${strings(ctx.dbchat, 'viewConfig')}

id: <code>${chat.id}</code>
type: <code>${ctx.chat.type}</code>
shieldyRole: <code>${
      ctx.chat.type === 'private'
        ? 'N/A'
        : (await ctx.getChatMember((await ctx.telegram.getMe()).id)).status
    }</code>
language: <code>${chat.language}</code>
captchaType: <code>${chat.captchaType}</code>
timeGiven: <code>${chat.timeGiven}</code>
adminLocked: <code>${chat.adminLocked}</code>
restrict: <code>${chat.restrict}</code>
noChannelLinks: <code>${chat.noChannelLinks}</code>
deleteEntryMessages: <code>${chat.deleteEntryMessages}</code>
greetsUsers: <code>${chat.greetsUsers}</code>
customCaptchaMessage: <code>${chat.customCaptchaMessage}</code>
strict: <code>${chat.strict}</code>
deleteGreetingTime: <code>${chat.deleteGreetingTime || 0}</code>
banUsers: <code>${chat.banUsers}</code>
deleteEntryOnKick: <code>${chat.deleteEntryOnKick}</code>
cas: <code>${chat.cas}</code>
underAttack: <code>${chat.underAttack}</code>
noAttack: <code>${chat.noAttack}</code>
buttonText: <code>${chat.buttonText || 'Not set'}</code>
allowInvitingBots: <code>${chat.allowInvitingBots}</code>
skipOldUsers: <code>${chat.skipOldUsers}</code>
skipVerifiedUsers: <code>${chat.skipVerifiedUsers}</code>
restrictTime: <code>${chat.restrictTime || 24}</code>
banNewTelegramUsers: <code>${chat.banNewTelegramUsers}</code>
greetingButtons:
<code>${chat.greetingButtons || 'Not set'}</code>`,
    Extra.inReplyTo(ctx.message.message_id).HTML(true)
  )
  if (chat.greetingMessage) {
    chat.greetingMessage.message.chat = undefined
    await ctx.telegram.sendCopy(ctx.dbchat.id, chat.greetingMessage.message, {
      ...Extra.webPreview(false).inReplyTo(ctx.message.message_id),
      entities: chat.greetingMessage.message.entities,
    })
  }
  if (chat.captchaMessage) {
    chat.captchaMessage.message.chat = undefined
    await ctx.telegram.sendCopy(ctx.dbchat.id, chat.captchaMessage.message, {
      ...Extra.webPreview(false).inReplyTo(ctx.message.message_id),
      entities: chat.captchaMessage.message.entities,
    })
  }
}

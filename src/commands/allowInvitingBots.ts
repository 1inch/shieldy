import { kickChatMember } from '@helpers/newcomers/kickChatMember'
import { clarifyIfPrivateMessages } from '@helpers/clarifyIfPrivateMessages'
import { Telegraf, Context, Extra } from 'telegraf'
import { strings } from '@helpers/strings'
import { checkLock } from '@middlewares/checkLock'
import { saveChatProperty } from '@helpers/saveChatProperty'

export function setupAllowInvitingBots(bot: Telegraf<Context>) {
  bot.command(
    'allowInvitingBots',
    checkLock,
    clarifyIfPrivateMessages,
    async (ctx) => {
      let chat = ctx.dbchat
      chat.allowInvitingBots = !chat.allowInvitingBots
      await saveChatProperty(chat, 'allowInvitingBots')
      ctx.replyWithMarkdown(
        strings(
          ctx.dbchat,
          chat.allowInvitingBots
            ? 'allowInvitingBots_true'
            : 'allowInvitingBots_false'
        ),
        Extra.inReplyTo(ctx.message.message_id)
      )
    }
  )
}

export function setupCheckAllowInvitingBots(bot: Telegraf<Context>) {
  bot.on('new_chat_members', (ctx, next) => {
    // Kick bots if required
    if (!ctx.dbchat.allowInvitingBots) {
      return ctx.message.new_chat_members
        .filter((m) => m.is_bot && m.username !== (bot as any).botInfo.username)
        .forEach((m) => {
          kickChatMember(ctx.dbchat, m)
        })
    } else {
      return next()
    }
  })
}

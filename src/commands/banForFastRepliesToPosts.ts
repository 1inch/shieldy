import { kickChatMember } from '@helpers/newcomers/kickChatMember'
import { deleteMessageSafe } from '@helpers/deleteMessageSafe'
import { CappedMessageModel } from '@models/CappedMessage'
import { clarifyIfPrivateMessages } from '@helpers/clarifyIfPrivateMessages'
import { saveChatProperty } from '@helpers/saveChatProperty'
import { Telegraf, Context, Extra } from 'telegraf'
import { strings } from '@helpers/strings'
import { checkLock } from '@middlewares/checkLock'

export function setupBanForFastRepliesToPosts(bot: Telegraf<Context>) {
  // Reply to command
  bot.command(
    'banForFastRepliesToPosts',
    checkLock,
    clarifyIfPrivateMessages,
    async (ctx) => {
      let chat = ctx.dbchat
      chat.banForFastRepliesToPosts = !chat.banForFastRepliesToPosts
      await saveChatProperty(chat, 'banForFastRepliesToPosts')
      ctx.replyWithMarkdown(
        strings(
          ctx.dbchat,
          chat.banForFastRepliesToPosts
            ? 'banForFastRepliesToPosts_true'
            : 'banForFastRepliesToPosts_false'
        ),
        Extra.inReplyTo(ctx.message.message_id)
      )
    }
  )
  // Save channel messages
  bot.use(async (ctx, next) => {
    // Check if a channel post
    if (ctx.message?.from?.id !== 777000) {
      return next()
    }
    // Check if needs saving
    if (!ctx.dbchat.banForFastRepliesToPosts) {
      return next()
    }
    // Save
    const message = ctx.message
    try {
      await new CappedMessageModel({
        message_id: message.message_id,
        from_id: message.from.id,
        chat_id: message.chat.id,
      }).save()
    } catch {
      // Do nothing
    } finally {
      return next()
    }
  })
  //
  bot.use(async (ctx, next) => {
    // Check if a reply to a channel post
    if (!ctx.message || ctx.message?.reply_to_message?.from?.id !== 777000) {
      return next()
    }
    // Check if an admin
    if (ctx.isAdministrator) {
      return next()
    }
    // Check if needs checking
    if (!ctx.dbchat.banForFastRepliesToPosts) {
      return next()
    }
    // Check the message
    const now = Date.now()
    try {
      // Try to find this channel post
      const post = await CappedMessageModel.findOne({
        message_id: ctx.message.reply_to_message.message_id,
        from_id: ctx.message.reply_to_message.from.id,
        chat_id: ctx.message.reply_to_message.chat.id,
      })
      if (!post) {
        return next()
      }
      if (now - post.createdAt.getTime() < 5 * 1000) {
        await kickChatMember(ctx.dbchat, ctx.from)
        if (ctx.dbchat.deleteEntryOnKick) {
          await deleteMessageSafe(ctx)
        }
      }
    } catch {
      // Do nothing
    }
  })
}

// Dependencies
import { Telegraf, ContextMessageUpdate, Extra } from 'telegraf'
import { strings } from '../helpers/strings'
import { checkLock } from '../middlewares/checkLock'
import { report } from '../helpers/report'

export function setupBan(bot: Telegraf<ContextMessageUpdate>) {
  bot.command('ban', checkLock, async ctx => {
    // Check if reply
    if (!ctx.message || !ctx.message.reply_to_message) {
      return
    }
    // Get replied
    const repliedId = ctx.message.reply_to_message.from.id
    // Check if sent by admin
    const admins = await ctx.telegram.getChatAdministrators(ctx.chat.id)
    if (!admins.map(a => a.user.id).includes(ctx.from.id)) {
      return
    }
    // Check permissions
    const admin = admins.find(v => v.user.id === ctx.from.id)
    if (!admin.can_restrict_members) {
      return
    }
    // Ban in Telegram
    await ctx.telegram.kickChatMember(ctx.dbchat.id, repliedId)
    // Unrestrict in shieldy
    ctx.dbchat.restrictedUsers = ctx.dbchat.restrictedUsers.filter(
      c => c.id !== repliedId
    )
    // Remove from candidates
    const candidate = ctx.dbchat.candidates
      .filter(c => c.id === repliedId)
      .pop()
    if (candidate) {
      // Delete message
      try {
        await ctx.telegram.deleteMessage(ctx.dbchat.id, candidate.messageId)
      } catch (err) {
        await report(err)
      }
      // Remove from candidates
      ctx.dbchat.candidates = ctx.dbchat.candidates.filter(
        c => c.id !== repliedId
      )
    }
    // Save chat
    await ctx.dbchat.save()
    // Reply with success
    await ctx.replyWithMarkdown(
      strings(ctx.dbchat, 'trust_success'),
      Extra.inReplyTo(ctx.message.message_id)
    )
  })
}

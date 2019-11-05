// Dependencies
import { Telegraf, ContextMessageUpdate, Extra } from 'telegraf'
import { strings } from '../helpers/strings'
import { checkLock } from '../middlewares/checkLock'
import { report } from '../helpers/report'

export function setupTrust(bot: Telegraf<ContextMessageUpdate>) {
  bot.command('trust', checkLock, async ctx => {
    // Check if reply
    if (!ctx.message || !ctx.message.reply_to_message) {
      return
    }
    // Get replied
    const repliedId = ctx.message.reply_to_message.from.id
    // Unrestrict in Telegram
    try {
      await (ctx.telegram as any).restrictChatMember(ctx.dbchat.id, repliedId, {
        can_send_messages: true,
        can_send_media_messages: true,
        can_send_other_messages: true,
        can_add_web_page_previews: true,
      })
    } catch (err) {
      await report(bot, err, ctx)
    }
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
        await report(bot, err, ctx)
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

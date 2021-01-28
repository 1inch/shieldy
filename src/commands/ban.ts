import { clarifyIfPrivateMessages } from '@helpers/clarifyIfPrivateMessages'
import { modifyCandidates } from '@helpers/candidates'
import { Candidate } from '@models/Chat'
import { modifyRestrictedUsers } from '@helpers/restrictedUsers'
import { isGroup } from '@helpers/isGroup'
import { deleteMessageSafeWithBot } from '@helpers/deleteMessageSafe'
import { Telegraf, Context } from 'telegraf'
import { strings } from '@helpers/strings'
import { checkLock } from '@middlewares/checkLock'

export function setupBan(bot: Telegraf<Context>) {
  bot.command('ban', checkLock, clarifyIfPrivateMessages, async (ctx) => {
    // Check if reply
    if (!ctx.message || !ctx.message.reply_to_message) {
      return
    }
    // Check if not a group
    if (!isGroup(ctx)) {
      return
    }
    // Get replied
    const repliedId = ctx.message.reply_to_message.from.id
    // Check if sent by admin
    const admins = await ctx.getChatAdministrators()
    if (!admins.map((a) => a.user.id).includes(ctx.from.id)) {
      return
    }
    // Check permissions
    const admin = admins.find((v) => v.user.id === ctx.from.id)
    if (admin.status !== 'creator' && !admin.can_restrict_members) {
      return
    }
    // Ban in Telegram
    await ctx.telegram.kickChatMember(ctx.dbchat.id, repliedId)
    // Unrestrict in shieldy
    modifyRestrictedUsers(ctx.dbchat, false, [{ id: repliedId } as Candidate])
    // Remove from candidates
    const candidate = ctx.dbchat.candidates
      .filter((c) => c.id === repliedId)
      .pop()
    if (candidate) {
      // Delete message
      await deleteMessageSafeWithBot(ctx.dbchat.id, candidate.messageId)
      // Remove from candidates
      modifyCandidates(ctx.dbchat, false, [{ id: repliedId } as Candidate])
    }
    // Reply with success
    await ctx.replyWithMarkdown(strings(ctx.dbchat, 'trust_success'))
  })
}

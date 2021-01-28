import { clarifyIfPrivateMessages } from '@helpers/clarifyIfPrivateMessages'
import { modifyCandidates } from '@helpers/candidates'
import { modifyRestrictedUsers } from '@helpers/restrictedUsers'
import { deleteMessageSafeWithBot } from '@helpers/deleteMessageSafe'
import { Telegraf, Context, Extra } from 'telegraf'
import { strings } from '@helpers/strings'
import { checkLock } from '@middlewares/checkLock'
import { report } from '@helpers/report'
import { Candidate } from '@models/Chat'

export function setupTrust(bot: Telegraf<Context>) {
  bot.command('trust', checkLock, clarifyIfPrivateMessages, async (ctx) => {
    // Check if it is a handle message
    const handle = ctx.message.text.substr(7).replace('@', '')
    let handleId: number | undefined
    if (handle) {
      for (const c of ctx.dbchat.candidates) {
        if (c.username === handle) {
          handleId = c.id
          break
        }
      }
    }
    // Check if reply
    if (!ctx.message || (!ctx.message.reply_to_message && !handleId)) {
      return
    }
    // Get replied
    const repliedId = handleId || ctx.message.reply_to_message.from.id
    // Unrestrict in Telegram
    try {
      await (ctx.telegram as any).restrictChatMember(ctx.dbchat.id, repliedId, {
        can_send_messages: true,
        can_send_media_messages: true,
        can_send_other_messages: true,
        can_add_web_page_previews: true,
      })
    } catch (err) {
      report(err)
    }
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
    await ctx.replyWithMarkdown(
      strings(ctx.dbchat, 'trust_success'),
      Extra.inReplyTo(ctx.message.message_id)
    )
  })
}

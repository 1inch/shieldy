import { Telegraf, Context } from 'telegraf'
import { checkSuperAdmin } from '@middlewares/checkSuperAdmin'

export function setupAdmin(bot: Telegraf<Context>) {
  bot.command('delete', checkSuperAdmin, async (ctx) => {
    if (
      !ctx ||
      !ctx.message ||
      !ctx.message.reply_to_message ||
      !ctx.message.reply_to_message.message_id
    ) {
      return
    }
    await ctx.telegram.deleteMessage(
      ctx.chat.id,
      ctx.message.reply_to_message.message_id
    )
    await ctx.deleteMessage()
  })

  bot.command('admin', checkSuperAdmin, async (ctx) => {
    if (
      !ctx ||
      !ctx.message ||
      !ctx.message.reply_to_message ||
      !ctx.message.reply_to_message.from
    ) {
      return
    }
    await ctx.promoteChatMember(ctx.message.reply_to_message.from.id, {
      can_change_info: true,
      can_post_messages: true,
      can_edit_messages: true,
      can_delete_messages: true,
      can_invite_users: true,
      can_restrict_members: true,
      can_pin_messages: true,
      can_promote_members: true,
    })
    await ctx.deleteMessage()
  })

  bot.command('source', checkSuperAdmin, async (ctx) => {
    if (!ctx || !ctx.message || !ctx.message.reply_to_message) {
      return
    }
    await ctx.replyWithHTML(
      `<code>${JSON.stringify(
        ctx.message.reply_to_message,
        undefined,
        2
      )}</code>`
    )
    await ctx.deleteMessage()
  })
}

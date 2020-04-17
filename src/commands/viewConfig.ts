// Dependencies
import { Telegraf, ContextMessageUpdate, Extra } from 'telegraf'
import { strings } from '../helpers/strings'
import { checkLock } from '../middlewares/checkLock'

export function setupViewConfig(bot: Telegraf<ContextMessageUpdate>) {
  bot.command('viewConfig', checkLock, async (ctx) => {
    await ctx.replyWithMarkdown(
      `${strings(ctx.dbchat, 'viewConfig')}

id: <code>${ctx.dbchat.id}</code>
language: <code>${ctx.dbchat.language}</code>
captchaType: <code>${ctx.dbchat.captchaType}</code>
timeGiven: <code>${ctx.dbchat.timeGiven}</code>
adminLocked: <code>${ctx.dbchat.adminLocked}</code>
restrict: <code>${ctx.dbchat.restrict}</code>
noChannelLinks: <code>${ctx.dbchat.noChannelLinks}</code>
deleteEntryMessages: <code>${ctx.dbchat.deleteEntryMessages}</code>
greetsUsers: <code>${ctx.dbchat.greetsUsers}</code>
customCaptchaMessage: <code>${ctx.dbchat.customCaptchaMessage}</code>
strict: <code>${ctx.dbchat.strict}</code>
deleteGreetingTime: <code>${ctx.dbchat.deleteGreetingTime || 0}</code>
banUsers: <code>${ctx.dbchat.banUsers}</code>
deleteEntryOnKick: <code>${ctx.dbchat.deleteEntryOnKick}</code>
cas: <code>${ctx.dbchat.cas}</code>
underAttack: <code>${ctx.dbchat.underAttack}</code>
noAttack: <code>${ctx.dbchat.noAttack}</code>
buttonText: <code>${ctx.dbchat.buttonText || 'Not set'}</code>
allowInvitingBots: <code>${ctx.dbchat.allowInvitingBots}</code>
greetingButtons:
<code>${ctx.dbchat.greetingButtons || 'Not set'}</code>`,
      Extra.inReplyTo(ctx.message.message_id).HTML(true)
    )
    if (ctx.dbchat.greetingMessage) {
      await ctx.telegram.sendCopy(
        ctx.dbchat.id,
        ctx.dbchat.greetingMessage.message,
        Extra.inReplyTo(ctx.message.message_id)
      )
    }
    if (ctx.dbchat.captchaMessage) {
      await ctx.telegram.sendCopy(
        ctx.dbchat.id,
        ctx.dbchat.captchaMessage.message,
        Extra.inReplyTo(ctx.message.message_id)
      )
    }
  })
}

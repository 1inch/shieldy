import { clarifyReply } from '@helpers/clarifyReply'
import { clarifyIfPrivateMessages } from '@helpers/clarifyIfPrivateMessages'
import { saveChatProperty } from '@helpers/saveChatProperty'
import { Telegraf, Context, Extra } from 'telegraf'
import { strings, localizations } from '@helpers/strings'
import { checkLock } from '@middlewares/checkLock'
import { report } from '@helpers/report'
import { ExtraReplyMessage } from 'telegraf/typings/telegram-types'

export function setupGreetingButtons(bot: Telegraf<Context>) {
  // Setup command
  bot.command(
    'greetingButtons',
    checkLock,
    clarifyIfPrivateMessages,
    async (ctx) => {
      await ctx.replyWithMarkdown(
        `${strings(ctx.dbchat, 'greetingButtons')}`,
        Extra.inReplyTo(ctx.message.message_id).webPreview(false)
      )
      await ctx.replyWithMarkdown(
        `<code>${
          ctx.dbchat.greetingButtons ||
          strings(ctx.dbchat, 'greetingButtonsEmpty')
        }</code>`,
        Extra.webPreview(false).HTML(true)
      )
      await clarifyReply(ctx)
    }
  )
  // Setup checker
  bot.use(async (ctx, next) => {
    try {
      // Check if reply
      if (!ctx.message || !ctx.message.reply_to_message) {
        return
      }
      // Check if text
      if (!ctx.message.text) {
        return
      }
      // Check if reply to shieldy
      if (
        !ctx.message.reply_to_message.from ||
        !ctx.message.reply_to_message.from.username ||
        ctx.message.reply_to_message.from.username !==
          (bot as any).botInfo.username
      ) {
        return
      }
      // Check if reply to the correct message
      const greetingButtonsMessages = Object.keys(
        localizations.greetingButtons
      ).map((k) => localizations.greetingButtons[k])
      if (
        !ctx.message.reply_to_message.text ||
        greetingButtonsMessages.indexOf(ctx.message.reply_to_message.text) < 0
      ) {
        return
      }
      // Check format
      const components = ctx.message.text.split('\n')
      let result = []
      for (const component of components) {
        const parts = component.split(' - ')
        if (parts.length !== 2) {
          // Default
          ctx.dbchat.greetingButtons = undefined
          await saveChatProperty(ctx.dbchat, 'greetingButtons')
          return
        } else {
          result.push(component)
        }
      }
      // Save text
      ctx.dbchat.greetingButtons = result.join('\n')
      await saveChatProperty(ctx.dbchat, 'greetingButtons')
      ctx.reply(
        strings(ctx.dbchat, 'greetsUsers_message_accepted'),
        Extra.inReplyTo(ctx.message.message_id) as ExtraReplyMessage
      )
    } catch (err) {
      report(err)
    } finally {
      next()
    }
  })
}

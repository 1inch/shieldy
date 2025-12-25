import { sendSubscriptionButtons } from '@commands/subscription'
import { SubscriptionStatus } from '@models/Chat'
import { Context } from 'telegraf'

const chatCache = {}

export function checkSubscription(ctx: Context, next) {
  if (
    ctx.chat.type !== 'private' &&
    ctx.dbchat.subscriptionStatus === SubscriptionStatus.inactive
  ) {
    if (
      !chatCache[ctx.chat.id] ||
      Date.now() - chatCache[ctx.chat.id] > 1000 * 60
    ) {
      chatCache[ctx.chat.id] = Date.now()
      return sendSubscriptionButtons(ctx)
    } else {
      return
    }
  }
  return next()
}

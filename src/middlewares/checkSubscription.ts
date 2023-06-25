import { sendSubscriptionButtons } from '@commands/subscription'
import { SubscriptionStatus } from '@models/Chat'
import { Context } from 'telegraf'

export function checkSubscription(ctx: Context, next) {
  if (
    ctx.chat.type !== 'private' &&
    ctx.dbchat.subscriptionStatus === SubscriptionStatus.inactive
  ) {
    return sendSubscriptionButtons(ctx)
  }
  return next()
}

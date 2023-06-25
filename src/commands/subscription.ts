import { strings } from '@helpers/strings'
import { checkIfGroup } from '@middlewares/checkIfGroup'
import { Telegraf, Context } from 'telegraf'
import { checkLock } from '@middlewares/checkLock'
import { stripe } from '@helpers/stripe'
import { Language } from '@models/Chat'
import Stripe from 'stripe'

const prices = {
  monthly: process.env.MONTHLY_PRICE,
  yearly: process.env.YEARLY_PRICE,
  lifetime: process.env.LIFETIME_PRICE,
}

export function setupSubscription(bot: Telegraf<Context>) {
  bot.command('subscription', checkIfGroup, checkLock, async (ctx) => {
    if (!ctx.dbchat.subscriptionId) {
      return sendSubscriptionButtons(ctx)
    }
    if (
      ctx.from.id !== parseInt(process.env.ADMIN) &&
      ctx.from?.username !== 'GroupAnonymousBot' &&
      !ctx.isAdministrator
    ) {
      try {
        await ctx.deleteMessage()
      } catch {
        // do nothing
      }
      return
    }
    return sendManageSubscription(ctx)
  })
}

export async function sendSubscriptionButtons(ctx: Context) {
  await ctx.telegram.sendChatAction(ctx.chat.id, 'typing')
  return ctx.reply(strings(ctx.dbchat, 'noSubscription'), {
    reply_markup: {
      inline_keyboard: await subscriptionsKeyboard(ctx),
    },
  })
}

export async function sendManageSubscription(ctx: Context) {
  const keyboard = []
  const subscription = await stripe.subscriptions.retrieve(
    ctx.dbchat.subscriptionId
  )
  const customerId = subscription.customer as string
  const url = (
    await stripe.billingPortal.sessions.create({
      customer: customerId,
    })
  ).url
  keyboard.push([
    {
      text: strings(ctx.dbchat, 'manageSubscription'),
      url,
    },
  ])
  return ctx.reply(strings(ctx.dbchat, 'manageSubscription'), {
    reply_markup: {
      inline_keyboard: keyboard,
    },
  })
}

async function subscriptionsKeyboard(ctx: Context) {
  let unsafeLocale = ctx.dbchat.language || 'en'
  if (unsafeLocale === Language.UKRAINIAN) {
    unsafeLocale = 'en'
  }
  const locale = unsafeLocale as Stripe.Checkout.Session.Locale
  const getBackUrl = 'https://t.me/shieldy_premium_bot'
  const monthlySession = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price: prices.monthly,
        quantity: 1,
      },
    ],
    success_url: getBackUrl,
    cancel_url: getBackUrl,
    client_reference_id: `${ctx.chat.id}`,
    locale,
    mode: 'subscription',
    allow_promotion_codes: true,
  })
  const yearlySession = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price: prices.yearly,
        quantity: 1,
      },
    ],
    success_url: getBackUrl,
    cancel_url: getBackUrl,
    client_reference_id: `${ctx.chat.id}`,
    locale,
    mode: 'subscription',
    allow_promotion_codes: true,
  })
  const lifetimeSession = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price: prices.lifetime,
        quantity: 1,
      },
    ],
    success_url: getBackUrl,
    cancel_url: getBackUrl,
    client_reference_id: `${ctx.chat.id}`,
    locale,
    mode: 'payment',
    allow_promotion_codes: true,
  })
  return [
    [
      {
        text: `$15/${strings(ctx.dbchat, 'monthly')}`,
        url: monthlySession.url,
      },
    ],
    [
      {
        text: `$108/${strings(ctx.dbchat, 'yearly')}`,
        url: yearlySession.url,
      },
    ],
    [
      {
        text: `$450 ${strings(ctx.dbchat, 'lifetime')}`,
        url: lifetimeSession.url,
      },
    ],
  ]
}

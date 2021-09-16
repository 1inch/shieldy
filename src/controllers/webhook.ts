import { ChatModel, SubscriptionStatus } from '@models/Chat'
import { Context } from 'koa'
import { Controller, Ctx, Post } from 'amala'
import { stripe } from '@helpers/stripe'

@Controller('/webhook')
export default class WebhookController {
  @Post('/')
  async webhook(@Ctx() ctx: Context) {
    try {
      // Construct event
      const event = stripe.webhooks.constructEvent(
        String(ctx.request.rawBody),
        ctx.headers['stripe-signature'],
        process.env.STRIPE_SIGNING_SECRET
      )
      // Handle event
      if (event.type === 'customer.subscription.deleted') {
        const anyData = event.data.object as any
        const subscriptionId = anyData.id
        const chat = await ChatModel.findOne({ subscriptionId })
        if (!chat) {
          return ctx.throw(
            400,
            `Webhook Error: No chat found for subscription id ${subscriptionId}`
          )
        }
        if (chat.subscriptionStatus !== SubscriptionStatus.lifetime) {
          chat.subscriptionStatus = SubscriptionStatus.inactive
        }
        await chat.save()
      } else if (event.type === 'checkout.session.completed') {
        const anyData = event.data.object as any
        const chatId = +anyData.client_reference_id
        const chat = await ChatModel.findOne({ id: chatId })
        if (!chat) {
          return ctx.throw(
            400,
            `Webhook Error: No chat found with id ${chatId}`
          )
        }
        if (anyData.mode === 'subscription') {
          chat.subscriptionId = anyData.subscription
          chat.subscriptionStatus = SubscriptionStatus.active
        } else {
          chat.subscriptionStatus = SubscriptionStatus.lifetime
        }
        await chat.save()
      }
      // Respond
      return { received: true }
    } catch (err) {
      return ctx.throw(400, `Webhook Error: ${err.message}`)
    }
  }
}

import { ChatModel, SubscriptionStatus } from '@models/Chat'
import { Context } from 'koa'
import { Controller, Ctx, Post } from 'amala'
import { stripe } from '@helpers/stripe'
import { bot } from '@helpers/bot'

@Controller('/webhook')
export default class WebhookController {
  @Post('/')
  async webhook(@Ctx() ctx: Context) {
    try {
      try {
        await bot.telegram.sendMessage(
          process.env.REPORT_CHAT_ID,
          'Webhook called'
        )
      } catch (err) {
        console.error(err)
      }
      // Construct event
      const event = stripe.webhooks.constructEvent(
        String(ctx.request.rawBody),
        ctx.headers['stripe-signature'],
        process.env.STRIPE_SIGNING_SECRET
      )
      try {
        await bot.telegram.sendMessage(
          process.env.REPORT_CHAT_ID,
          `Webhook decrypted: ${JSON.stringify(event)}`
        )
      } catch (err) {
        console.error(err)
      }
      // Handle event
      if (event.type === 'customer.subscription.deleted') {
        const anyData = event.data.object as any
        const subscriptionId = anyData.id
        const chat = await ChatModel.findOne({ subscriptionId })
        if (!chat) {
          await bot.telegram.sendMessage(
            process.env.REPORT_CHAT_ID,
            `Webhook Error: No chat found for subscription id ${subscriptionId}`
          )
          return
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
        try {
          await bot.telegram.sendMessage(
            process.env.REPORT_CHAT_ID,
            `Chat updating: ${JSON.stringify(chat)}`
          )
        } catch (err) {
          console.error(err)
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
      try {
        await bot.telegram.sendMessage(
          process.env.REPORT_CHAT_ID,
          `Webhook Error: ${err.message}`
        )
      } catch (err) {
        console.error(err)
      }
      return ctx.throw(400, `Webhook Error: ${err.message}`)
    }
  }
}

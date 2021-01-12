import { Context, Telegraf } from 'telegraf'
const TelegrafBot = require('telegraf')

export const bot = new TelegrafBot(process.env.TOKEN, {
  handlerTimeout: 1,
}) as Telegraf<Context>

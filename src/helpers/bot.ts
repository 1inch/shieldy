import { Context, Telegraf } from 'telegraf'

// Dependencies
const TelegrafBot = require('telegraf')

export const bot = new TelegrafBot(process.env.TOKEN) as Telegraf<Context>

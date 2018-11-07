// Dependencies
const Telegraf = require('telegraf')

export const bot = new Telegraf(process.env.TOKEN)

bot.telegram.getMe().then(botInfo => {
  bot.options.username = botInfo.username
})

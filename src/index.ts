// Config dotenv
import * as dotenv from 'dotenv'
dotenv.config({ path: `${__dirname}/../.env` })
// Dependencies
import { attachUser } from './middlewares/attachUser'
import { bot } from './helpers/bot'
import { setupHelp } from './commands/help'
import { setupLanguage } from './commands/language'
import { setupCaptcha } from './commands/captcha'
import { setupNewcomers } from './helpers/newcomers'
import { setupTimeLimit } from './commands/timeLimit'
import { setupLock } from './commands/lock'

// Add chat to context
bot.use(attachUser)
// Commands
setupHelp(bot)
setupLanguage(bot)
setupCaptcha(bot)
setupTimeLimit(bot)
setupLock(bot)
// Newcomers logic
setupNewcomers(bot)

// Start bot
bot.startPolling()

// Log
console.info('Bot is up and running')

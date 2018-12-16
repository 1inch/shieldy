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
import { checkTime } from './middlewares/checkTime'
import { setupRestrict } from './commands/restrict'
import { checkRestrict } from './middlewares/checkRestrict'
import { setupDeleteEntryMessages } from './commands/deleteEntryMessages'
import { setupGreeting, checkGreeting } from './commands/greeting'

// Check time
bot.use(checkTime)
// Add chat to context
bot.use(attachUser)
// Check if restricted
bot.use(checkRestrict)
// Check if updates greeting message
bot.use(checkGreeting)
// Commands
setupHelp(bot)
setupLanguage(bot)
setupCaptcha(bot)
setupTimeLimit(bot)
setupLock(bot)
setupRestrict(bot)
setupDeleteEntryMessages(bot)
setupGreeting(bot)
// Newcomers logic
setupNewcomers(bot)

// Start bot
bot.startPolling()

// Log
console.info('Bot is up and running')

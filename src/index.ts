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
import { setupGreeting } from './commands/greeting'
import { setupTrust } from './commands/trust'
import { setupStrict } from './commands/strict'
import { setupCaptchaMessage } from './commands/captchaMessage'
import { setupTestLocales } from './commands/testLocales'
import { setupDeleteGreetingTime } from './commands/deleteGreetingTime'
import { setupBanUsers } from './commands/banUsers'
import { messageSaver } from './middlewares/messageSaver'

// Check time
bot.use(checkTime)
// Add chat to context
bot.use(attachUser)
// Check if restricted
bot.use(checkRestrict)
// Setup message saver
bot.use(messageSaver)
// Commands
setupHelp(bot)
setupLanguage(bot)
setupCaptcha(bot)
setupTimeLimit(bot)
setupLock(bot)
setupRestrict(bot)
setupDeleteEntryMessages(bot)
setupGreeting(bot)
setupTrust(bot)
setupStrict(bot)
setupCaptchaMessage(bot)
setupTestLocales(bot)
setupDeleteGreetingTime(bot)
setupBanUsers(bot)
// Newcomers logic
setupNewcomers(bot)

// Catch
bot.catch(console.log)

// Start bot
bot.startPolling()

// Log
console.info('Bot is up and running')

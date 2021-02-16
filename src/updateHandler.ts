import 'module-alias/register'
import * as dotenv from 'dotenv'
dotenv.config({ path: `${__dirname}/../.env` })
import '@models'
import { attachUser } from '@middlewares/attachUser'
import { bot } from '@helpers/bot'
import { setupHelp } from '@commands/help'
import { setupLanguage } from '@commands/language'
import { setupCaptcha } from '@commands/captcha'
import { setupNewcomers } from '@helpers/newcomers'
import { setupTimeLimit } from '@commands/timeLimit'
import { setupLock } from '@commands/lock'
import { checkTime } from '@middlewares/checkTime'
import { setupRestrict } from '@commands/restrict'
import { checkRestrict } from '@middlewares/checkRestrict'
import { setupNoChannelLinks } from '@commands/noChannelLinks'
import { checkNoChannelLinks } from '@middlewares/checkNoChannelLinks'
import { setupDeleteEntryMessages } from '@commands/deleteEntryMessages'
import { setupGreeting } from '@commands/greeting'
import { setupTrust } from '@commands/trust'
import { setupStrict } from '@commands/strict'
import { setupCaptchaMessage } from '@commands/captchaMessage'
import { setupTestLocales } from '@commands/testLocales'
import { setupDeleteGreetingTime } from '@commands/deleteGreetingTime'
import { setupBanUsers } from '@commands/banUsers'
import { setupDeleteEntryOnKick } from '@commands/deleteEntryOnKick'
import { setupCAS } from '@commands/cas'
import { setupBan } from '@commands/ban'
import { setupUnderAttack } from '@commands/underAttack'
import { setupNoAttack } from '@commands/noAttack'
import { setupViewConfig } from '@commands/viewConfig'
import { setupButtonText } from '@commands/buttonText'
import { setupAllowInvitingBots } from '@commands/allowInvitingBots'
import { setupAdmin } from '@commands/admin'
import { setupGreetingButtons } from '@commands/greetingButtons'
import { setupSkipOldUsers } from '@commands/skipOldUsers'
import { setupSkipVerifiedUsers } from '@commands/skipVerifiedUsers'
import { setupSetConfig } from '@commands/setConfig'
import { report } from '@helpers/report'
import { attachChatMember } from '@middlewares/attachChatMember'
import { isMaster } from 'cluster'
import { setupBanForFastRepliesToPosts } from '@commands/banForFastRepliesToPosts'

bot.use((ctx, next) => {
  if (ctx.update.message?.date && ctx.update.message?.text === '/help') {
    console.log('Got help', Date.now() / 1000 - ctx.update.message?.date)
  }
  return next()
})
// Ignore all messages that are too old
bot.use(checkTime)
// Add chat to context
bot.use(attachUser)
// Add chat member to context
bot.use(attachChatMember)
// Check if restricted
bot.use(checkRestrict)
// Check if channel links are present
bot.use(checkNoChannelLinks)
// Commands
setupHelp(bot)
setupLanguage(bot)
setupCaptcha(bot)
setupTimeLimit(bot)
setupLock(bot)
setupRestrict(bot)
setupNoChannelLinks(bot)
setupDeleteEntryMessages(bot)
setupGreeting(bot)
setupTrust(bot)
setupStrict(bot)
setupCaptchaMessage(bot)
setupTestLocales(bot)
setupDeleteGreetingTime(bot)
setupBanUsers(bot)
setupDeleteEntryOnKick(bot)
setupCAS(bot)
setupBan(bot)
setupUnderAttack(bot)
setupNoAttack(bot)
setupViewConfig(bot)
setupButtonText(bot)
setupAllowInvitingBots(bot)
setupAdmin(bot)
setupGreetingButtons(bot)
setupSkipOldUsers(bot)
setupSkipVerifiedUsers(bot)
setupSetConfig(bot)
setupBanForFastRepliesToPosts(bot)
// Newcomers logic
setupNewcomers(bot)

// Catch
bot.catch(report)

if (!isMaster) {
  // Start bot
  bot.telegram
    .getMe()
    .then((botInfo) => {
      ;(bot as any).botInfo = botInfo
      ;(bot as any).options.username = botInfo.username
      console.info(`Update handler on ${process.pid} started`)
    })
    .catch(report)
}

module.exports = bot

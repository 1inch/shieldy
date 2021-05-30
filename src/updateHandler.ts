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
import {
  setupAllowInvitingBots,
  checkAllowInvitingBots,
} from '@commands/allowInvitingBots'
import { setupAdmin } from '@commands/admin'
import { setupGreetingButtons } from '@commands/greetingButtons'
import { setupSkipOldUsers } from '@commands/skipOldUsers'
import { setupSkipVerifiedUsers } from '@commands/skipVerifiedUsers'
import { setupSetConfig } from '@commands/setConfig'
import { report } from '@helpers/report'
import { attachChatMember } from '@middlewares/attachChatMember'
import { checkBlockList } from '@middlewares/checkBlockList'
import { isMaster } from 'cluster'
import { setupBanForFastRepliesToPosts } from '@commands/banForFastRepliesToPosts'
import { setupRestrictTime } from '@commands/restrictTime'
import { setupBanNewTelegramUsers } from '@commands/banNewTelegramUsers'
import { messageSaver } from '@middlewares/messageSaver'

bot.use((ctx, next) => {
  console.log(ctx.update.update_id)
  const anyUpdate = ctx.update as any
  if (anyUpdate.chat_member) {
    console.log(anyUpdate.chat_member)
  }
  return next()
})

// Ignore all messages that are too old
bot.use(checkTime)
// Check block list
bot.use(checkBlockList)
// Add chat to context
bot.use(attachUser)
// Remove bots right when they get added
bot.use(checkAllowInvitingBots)
// Add chat member to context
bot.use(attachChatMember)
// Check if restricted
bot.use(checkRestrict)
// Check if channel links are present
bot.use(checkNoChannelLinks)
// Save messages that need saving
bot.use(messageSaver)
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
setupRestrictTime(bot)
setupBanNewTelegramUsers(bot)
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

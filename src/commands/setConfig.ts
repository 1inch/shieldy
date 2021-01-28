import { clarifyIfPrivateMessages } from '@helpers/clarifyIfPrivateMessages'
import { ExtraReplyMessage } from 'telegraf/typings/telegram-types'
import { Language, CaptchaType } from '@models/Chat'
import { Telegraf, Context, Extra } from 'telegraf'
import { checkLock } from '@middlewares/checkLock'
import { sendCurrentConfig } from '@commands/viewConfig'
import { strings } from '@helpers/strings'

export function setupSetConfig(bot: Telegraf<Context>) {
  bot.command('setConfig', checkLock, clarifyIfPrivateMessages, async (ctx) => {
    try {
      const configText = ctx.message.text
        .replace(`/setConfig@${(bot as any).botInfo.username}`, '')
        .replace('/setConfig', '')
        .trim()
      console.log(configText)
      if (!configText) {
        ctx.reply(
          strings(ctx.dbchat, 'setConfigHelp'),
          Extra.inReplyTo(ctx.message.message_id).HTML(
            true
          ) as ExtraReplyMessage
        )
        return
      }
      const configMap = configText
        .split('\n')
        .map((c) => {
          const configComponents = c.split(': ')
          return configComponents.length < 2
            ? undefined
            : { key: configComponents[0], value: configComponents[1] }
        })
        .filter((v) => !!v)
        .reduce((p, c) => {
          const result = p
          result[c.key] = c.value
          return result
        }, {}) as { [index: string]: string }

      for (const key in configMap) {
        const value = configMap[key]
        switch (key) {
          case 'language': {
            // Validated by db
            ctx.dbchat.language = value as Language
            break
          }
          case 'captchaType': {
            // Validated by db
            ctx.dbchat.captchaType = value as CaptchaType
            break
          }
          case 'timeGiven': {
            const numValue = +value
            if (!isNaN(numValue) && numValue > 0 && numValue < 100000) {
              ctx.dbchat.timeGiven = numValue
            }
            break
          }
          case 'adminLocked': {
            const boolValue = value === 'true'
            ctx.dbchat.adminLocked = boolValue
            break
          }
          case 'restrict': {
            const boolValue = value === 'true'
            ctx.dbchat.restrict = boolValue
            break
          }
          case 'noChannelLinks': {
            const boolValue = value === 'true'
            ctx.dbchat.noChannelLinks = boolValue
            break
          }
          case 'deleteEntryMessages': {
            const boolValue = value === 'true'
            ctx.dbchat.deleteEntryMessages = boolValue
            break
          }
          case 'greetsUsers': {
            const boolValue = value === 'true'
            ctx.dbchat.greetsUsers = boolValue
            break
          }
          case 'customCaptchaMessage': {
            const boolValue = value === 'true'
            ctx.dbchat.customCaptchaMessage = boolValue
            break
          }
          case 'strict': {
            const boolValue = value === 'true'
            ctx.dbchat.strict = boolValue
            break
          }
          case 'deleteGreetingTime': {
            const numValue = +value
            if (!isNaN(numValue) && numValue > 0 && numValue < 100000) {
              ctx.dbchat.deleteGreetingTime = numValue
            }
            break
          }
          case 'banUsers': {
            const boolValue = value === 'true'
            ctx.dbchat.banUsers = boolValue
            break
          }
          case 'deleteEntryOnKick': {
            const boolValue = value === 'true'
            ctx.dbchat.deleteEntryOnKick = boolValue
            break
          }
          case 'cas': {
            const boolValue = value === 'true'
            ctx.dbchat.cas = boolValue
            break
          }
          case 'underAttack': {
            const boolValue = value === 'true'
            ctx.dbchat.underAttack = boolValue
            break
          }
          case 'noAttack': {
            const boolValue = value === 'true'
            ctx.dbchat.noAttack = boolValue
            break
          }
          case 'buttonText': {
            ctx.dbchat.buttonText = value
            break
          }
          case 'allowInvitingBots': {
            const boolValue = value === 'true'
            ctx.dbchat.allowInvitingBots = boolValue
            break
          }
          case 'skipOldUsers': {
            const boolValue = value === 'true'
            ctx.dbchat.skipOldUsers = boolValue
            break
          }
          case 'skipVerifiedUsers': {
            const boolValue = value === 'true'
            ctx.dbchat.skipVerifiedUsers = boolValue
            break
          }
          default:
            break
        }
      }
      await ctx.dbchat.save()
      await ctx.reply(
        '👍',
        Extra.inReplyTo(ctx.message.message_id).HTML(true) as ExtraReplyMessage
      )
      await sendCurrentConfig(ctx, ctx.dbchat)
    } catch (err) {
      await ctx.reply(
        '👎',
        Extra.inReplyTo(ctx.message.message_id).HTML(true) as ExtraReplyMessage
      )
      await ctx.reply(
        err.message,
        Extra.inReplyTo(ctx.message.message_id).HTML(true) as ExtraReplyMessage
      )
    }
  })
}

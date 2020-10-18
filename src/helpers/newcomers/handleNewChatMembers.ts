import { Candidate } from '@models/Chat'
import { bot } from '@helpers/bot'
import { ContextMessageUpdate } from 'telegraf'
import { modifyGloballyRestricted } from '@helpers/globallyRestricted'
import { sendHelp } from '@commands/help'
import { report } from '@helpers/report'
import { greetUser } from '@helpers/newcomers/greetUser'
import { modifyRestrictedUsers } from '@helpers/restrictedUsers'
import { isVerifiedUser } from '@models/VerifiedUser'
import { checkCAS } from '@helpers/cas'
import { kickChatMember } from '@helpers/newcomers/kickChatMember'
import { generateEquationOrImage } from '@helpers/newcomers/generateEquationOrImage'
import { notifyCandidate } from '@helpers/newcomers/notifyCandidate'
import { getCandidate } from '@helpers/newcomers/getCandidate'
import { restrictChatMember } from '@helpers/newcomers/restrictChatMember'
import { modifyCandidates } from '@helpers/candidates'
import { removeMessages } from '@models/CappedMessage'
import { deleteMessageSafe } from '@helpers/deleteMessageSafe'

export async function handleNewChatMembers(ctx: ContextMessageUpdate) {
  // Get list of ids
  const memberIds = ctx.message.new_chat_members.map((m) => m.id)
  // Add to globaly restricted list
  await modifyGloballyRestricted(memberIds, true)
  // Check if needs to delete message right away
  if (ctx.dbchat.deleteEntryMessages || ctx.dbchat.underAttack) {
    deleteMessageSafe(ctx)
  }
  // Start the newcomers logic
  try {
    // Check if no attack mode
    if (ctx.dbchat.noAttack) {
      return
    }
    // Get admin ids
    const adminIds = (await ctx.getChatAdministrators()).map((u) => u.user.id)
    // If an admin adds the members, do nothing
    if (adminIds.includes(ctx.message.from.id)) {
      return
    }
    // Send help message if added this bot to the group
    const addedUsernames = ctx.message.new_chat_members
      .map((member) => member.username)
      .filter((username) => !!username)
    if (addedUsernames.includes(bot.options.username)) {
      try {
        await sendHelp(ctx)
      } catch (err) {
        report(err)
      }
    }
    // Filter new members
    const membersToCheck = ctx.message.new_chat_members.filter(
      (m) => !adminIds.includes(m.id) && !m.is_bot
    )
    // Kick bots if required
    if (!ctx.dbchat.allowInvitingBots) {
      ctx.message.new_chat_members
        .filter((m) => m.is_bot)
        .forEach((m) => {
          kickChatMember(ctx.dbchat, m)
        })
    }
    // Placeholder to add all candidates in batch
    const candidatesToAdd = [] as Candidate[]
    // Loop through the members
    for (const member of membersToCheck) {
      // Check if an old user
      if (ctx.dbchat.skipOldUsers) {
        if (member.id > 0 && member.id < 1000000000) {
          await greetUser(ctx, member)
          console.log(
            'greeted a user',
            ctx.dbchat.captchaType,
            ctx.dbchat.customCaptchaMessage,
            ctx.dbchat.greetsUsers
          )
          if (ctx.dbchat.restrict) {
            await modifyRestrictedUsers(ctx.dbchat, true, [member])
          }
          continue
        }
      }
      // Check if a verified user
      if (ctx.dbchat.skipVerifiedUsers) {
        if (await isVerifiedUser(member.id)) {
          await greetUser(ctx, member)
          console.log(
            'greeted a user',
            ctx.dbchat.captchaType,
            ctx.dbchat.customCaptchaMessage,
            ctx.dbchat.greetsUsers
          )
          if (ctx.dbchat.restrict) {
            await modifyRestrictedUsers(ctx.dbchat, true, [member])
          }
          continue
        }
      }
      // Delete all messages that they've sent so far
      removeMessages(ctx.chat.id, member.id) // don't await here
      // Check if under attack
      if (ctx.dbchat.underAttack) {
        await kickChatMember(ctx.dbchat, member)
        continue
      }
      // Check if CAS banned
      if (!(await checkCAS(member.id))) {
        if (ctx.dbchat.deleteEntryOnKick) {
          try {
            await ctx.deleteMessage()
          } catch {
            // Do nothing
          }
        }
        await kickChatMember(ctx.dbchat, member)
        continue
      }
      // Check if already a candidate
      if (ctx.dbchat.candidates.map((c) => c.id).includes(member.id)) {
        continue
      }
      // Generate captcha if required
      const { equation, image } = await generateEquationOrImage(ctx.dbchat)
      // Notify candidate and save the message
      let message
      try {
        message = await notifyCandidate(ctx, member, equation, image)
        console.log(
          'notified a user',
          ctx.dbchat.captchaType,
          ctx.dbchat.customCaptchaMessage,
          ctx.dbchat.greetsUsers
        )
      } catch (err) {
        await report(err)
      }
      // Create a candidate
      const candidate = getCandidate(ctx, member, message, equation, image)
      // Restrict candidate if required
      if (ctx.dbchat.restrict) {
        await restrictChatMember(ctx.dbchat, member)
      }
      // Save candidate to the placeholder list
      candidatesToAdd.push(candidate)
    }
    // Add candidates to the list
    await modifyCandidates(ctx.dbchat, true, candidatesToAdd)
    // Restrict candidates if required
    await modifyRestrictedUsers(ctx.dbchat, true, candidatesToAdd)
  } catch (err) {
    console.error('onNewChatMembers', err)
  } finally {
    // Remove from globaly restricted list
    await modifyGloballyRestricted(false, memberIds)
  }
}

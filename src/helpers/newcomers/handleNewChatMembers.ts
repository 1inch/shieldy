import { ChatMember } from 'telegram-typings'
import { EntryMessageModel, removeEntryMessages } from '@models/EntryMessage'
import { Candidate } from '@models/Chat'
import { bot } from '@helpers/bot'
import { Context } from 'telegraf'
import { modifyGloballyRestricted } from '@helpers/globallyRestricted'
import { sendHelpSafe } from '@commands/help'
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

export async function handleNewChatMember(ctx: Context) {
  // Check if no attack mode
  if (ctx.dbchat.noAttack) {
    return
  }
  // Get new member
  const newChatMember = (ctx.update as any).chat_member
    .new_chat_member as ChatMember
  // Get list of ids
  const memberId = newChatMember.user.id
  // Add to globaly restricted list
  await modifyGloballyRestricted([memberId], true)
  // Start the newcomers logic
  try {
    // If an admin adds the members, do nothing
    const adder = await ctx.getChatMember(
      (ctx.update as any).chat_member.from.id
    )
    if (['creator', 'administrator'].includes(adder.status)) {
      return
    }
    // Filter new members
    const membersToCheck = [newChatMember.user]
    // Placeholder to add all candidates in batch
    const candidatesToAdd = [] as Candidate[]
    // Loop through the members
    for (const member of membersToCheck) {
      // Check if an old user
      if (ctx.dbchat.skipOldUsers) {
        if (member.id > 0 && member.id < 1000000000) {
          greetUser(ctx, member)
          if (ctx.dbchat.restrict) {
            modifyRestrictedUsers(ctx.dbchat, true, [member])
          }
          continue
        }
      }
      // Check if a verified user
      if (ctx.dbchat.skipVerifiedUsers) {
        if (await isVerifiedUser(member.id)) {
          greetUser(ctx, member)
          if (ctx.dbchat.restrict) {
            modifyRestrictedUsers(ctx.dbchat, true, [member])
          }
          continue
        }
      }
      // Delete all messages that they've sent so far
      removeMessages(ctx.chat.id, member.id) // don't await here
      // Check if under attack
      if (ctx.dbchat.underAttack) {
        kickChatMember(ctx.dbchat, member)
        continue
      }
      // Check if id is over 1 000 000 000
      if (ctx.dbchat.banNewTelegramUsers && member.id > 1000000000) {
        kickChatMember(ctx.dbchat, member)
        if (ctx.dbchat.deleteEntryOnKick) {
          removeEntryMessages(ctx.chat.id, memberId)
        }
        continue
      }
      // Check if CAS banned
      if (ctx.dbchat.cas && !(await checkCAS(member.id))) {
        kickChatMember(ctx.dbchat, member)
        if (ctx.dbchat.deleteEntryOnKick) {
          removeEntryMessages(ctx.chat.id, memberId)
        }
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
      } catch (err) {
        report(err)
      }
      // Create a candidate
      const candidate = getCandidate(ctx, member, message, equation, image)
      // Restrict candidate if required
      if (ctx.dbchat.restrict) {
        restrictChatMember(ctx.dbchat, member)
      }
      // Save candidate to the placeholder list
      candidatesToAdd.push(candidate)
    }
    // Add candidates to the list
    await modifyCandidates(ctx.dbchat, true, candidatesToAdd)
    // Restrict candidates if required
    await modifyRestrictedUsers(ctx.dbchat, true, candidatesToAdd)
    // Delete all messages that they've sent so far
    for (const member of candidatesToAdd) {
      removeMessages(ctx.chat.id, member.id) // don't await here
    }
  } catch (err) {
    console.error('onNewChatMembers', err)
  } finally {
    // Remove from globaly restricted list
    modifyGloballyRestricted([memberId], false)
  }
}

export async function handleNewChatMemberMessage(ctx: Context) {
  // Send help message if added this bot to the group
  const addedUsernames = ctx.message.new_chat_members
    .map((member) => member.username)
    .filter((username) => !!username)
  if (addedUsernames.includes((bot as any).botInfo.username)) {
    await sendHelpSafe(ctx)
    return
  }
  // Check if no attack mode
  if (ctx.dbchat.noAttack) {
    return
  }
  // Check if needs to delete message right away
  if (ctx.dbchat.deleteEntryMessages || ctx.dbchat.underAttack) {
    deleteMessageSafe(ctx)
    return
  }
  // Save for later if needs deleting
  if (ctx.dbchat.deleteEntryOnKick) {
    for (const newMember of ctx.message.new_chat_members) {
      await new EntryMessageModel({
        message_id: ctx.message.message_id,
        chat_id: ctx.chat.id,
        from_id: newMember.id,
      }).save()
    }
  }
}

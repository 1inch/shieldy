import { bot } from '../bot'
import { InstanceType } from 'typegoose'
import { Chat, Candidate } from '../../models/Chat'
import { report } from '../report'
import { addKickedUser } from './addKickedUser'
import { modifyCandidates } from '../candidates'
import { modifyRestrictedUsers } from '../restrictedUsers'

export async function kickCandidates(
  chat: InstanceType<Chat>,
  candidates: Candidate[]
) {
  // Loop through candidates
  for (const candidate of candidates) {
    // Try kicking the candidate
    try {
      addKickedUser(chat, candidate.id)
      kickChatMemberProxy(
        chat.id,
        candidate.id,
        chat.banUsers ? 0 : parseInt(`${new Date().getTime() / 1000 + 45}`)
      )
    } catch (err) {
      report(err)
    }
    // Try deleting their entry messages
    if (chat.deleteEntryOnKick) {
      deleteMessageProxy(candidate.entryChatId, candidate.entryMessageId)
      deleteMessageProxy(candidate.entryChatId, candidate.leaveMessageId)
    }
    // Try deleting the captcha message
    try {
      await bot.telegram.deleteMessage(chat.id, candidate.messageId)
    } catch (err) {
      await report(err, 'deleteMessage')
    }
  }
  // Remove from candidates
  await modifyCandidates(chat, false, candidates)
  // Remove from restricted
  await modifyRestrictedUsers(chat, false, candidates)
}

async function kickChatMemberProxy(
  id: number,
  candidateId: number,
  duration: number
) {
  try {
    await bot.telegram.kickChatMember(id, candidateId, duration)
  } catch (err) {
    report(err)
  }
}

async function deleteMessageProxy(id, messageId) {
  try {
    await bot.telegram.deleteMessage(id, messageId)
  } catch (err) {
    // do nothing
  }
}

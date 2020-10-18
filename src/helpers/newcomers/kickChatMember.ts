import { bot } from '../bot'
import { InstanceType } from 'typegoose'
import { User } from 'telegraf/typings/telegram-types'
import { Chat } from '../../models/Chat'
import { addKickedUser } from './addKickedUser'
import { report } from '../report'
import { modifyCandidates } from '../candidates'
import { modifyRestrictedUsers } from '../restrictedUsers'

export async function kickChatMember(chat: InstanceType<Chat>, user: User) {
  // Try kicking the member
  try {
    addKickedUser(chat, user.id)
    await bot.telegram.kickChatMember(
      chat.id,
      user.id,
      chat.banUsers ? 0 : parseInt(`${new Date().getTime() / 1000 + 45}`)
    )
  } catch (err) {
    report(err)
  }
  // Remove from candidates
  await modifyCandidates(chat, false, [user])
  // Remove from restricted
  await modifyRestrictedUsers(chat, false, [user])
}

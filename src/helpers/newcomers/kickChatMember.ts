import { bot } from '@helpers/bot'
import { DocumentType } from '@typegoose/typegoose'
import { User } from 'telegraf/typings/telegram-types'
import { Chat } from '@models/Chat'
import { addKickedUser } from '@helpers/newcomers/addKickedUser'
import { report } from '@helpers/report'
import { modifyCandidates } from '@helpers/candidates'
import { modifyRestrictedUsers } from '@helpers/restrictedUsers'

export async function kickChatMember(chat: DocumentType<Chat>, user: User) {
  // Try kicking the member
  try {
    await addKickedUser(chat, user.id)
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

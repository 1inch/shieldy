import { report } from '@helpers/report'
import { Chat, Candidate, ChatModel } from '@models/Chat'
import { User } from 'telegraf/typings/telegram-types'
import { DocumentType } from '@typegoose/typegoose'

export async function modifyCandidates(
  chat: DocumentType<Chat>,
  add: boolean,
  candidatesAndUsers: Array<Candidate | User>
) {
  console.log(chat._id, add, candidatesAndUsers)
  try {
    if (add) {
      await ChatModel.update(
        { _id: chat._id },
        { $push: { candidates: { candidatesAndUsers } } }
      )
    } else {
      const candidatesIds = candidatesAndUsers.map((c) => c.id)
      await ChatModel.update(
        { _id: chat._id },
        { $pull: { candidates: { id: { $in: candidatesIds } } } },
        { multi: true }
      )
    }
  } catch (err) {
    report(err)
  }
}

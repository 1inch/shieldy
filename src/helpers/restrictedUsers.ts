import { report } from '@helpers/report'
import { Chat, Candidate, ChatModel } from '@models/Chat'
import { User } from 'telegraf/typings/telegram-types'

export async function modifyRestrictedUsers(
  chat: Chat,
  add: boolean,
  candidatesAndUsers: Array<Candidate | User>
) {
  if (!candidatesAndUsers.length) {
    return
  }
  try {
    if (add) {
      await ChatModel.updateOne(
        { _id: chat._id },
        {
          $push: {
            restrictedUsers: candidatesAndUsers.map((v: Candidate) => {
              v.restrictTime = chat.restrictTime || 24
              return v
            }),
          },
        }
      )
    } else {
      const candidatesIds = candidatesAndUsers.map((c) => c.id)
      await ChatModel.updateOne(
        { _id: chat._id },
        { $pull: { restrictedUsers: { id: { $in: candidatesIds } } } },
        { multi: true }
      )
    }
  } catch (err) {
    report(err)
  }
}

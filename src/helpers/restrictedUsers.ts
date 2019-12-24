import { Lock } from 'semaphore-async-await'
import { Chat, Candidate } from '../models'
import { User } from 'telegraf/typings/telegram-types'
import { InstanceType } from 'typegoose'

export async function modifyRestrictedUsers(
  chat: InstanceType<Chat>,
  add: boolean,
  candidatesAndUsers: Array<Candidate | User>
) {
  const lock = new Lock()
  await lock.acquire()
  try {
    if (add) {
      // Only add candidates
      const candidates = candidatesAndUsers.filter(
        v => v instanceof Candidate
      ) as Candidate[]
      const candidatesIds = chat.restrictedUsers.map(c => c.id)
      for (const candidate of candidates) {
        if (!candidatesIds.includes(candidate.id)) {
          chat.restrictedUsers.push(candidate)
        }
      }
    } else {
      const ids = candidatesAndUsers.map(v => v.id)
      chat.restrictedUsers = chat.restrictedUsers.filter(
        c => !ids.includes(c.id)
      )
    }
    await chat.save()
  } catch (err) {
    console.error('modifyRestrictedUsers', err)
  } finally {
    lock.release()
  }
}

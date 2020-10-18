import { Lock } from 'semaphore-async-await'
import { Chat, Candidate } from '@models/Chat'
import { User } from 'telegraf/typings/telegram-types'
import { DocumentType } from '@typegoose/typegoose'

export async function modifyCandidates(
  chat: DocumentType<Chat>,
  add: boolean,
  candidatesAndUsers: Array<Candidate | User>
) {
  const lock = new Lock()
  await lock.acquire()
  try {
    if (add) {
      // Only add candidates
      const candidatesIds = chat.candidates.map((c) => c.id)
      for (const candidate of candidatesAndUsers) {
        if (!candidatesIds.includes(candidate.id)) {
          chat.candidates.push(candidate as Candidate)
        }
      }
    } else {
      const ids = candidatesAndUsers.map((v) => v.id)
      chat.candidates = chat.candidates.filter((c) => !ids.includes(c.id))
    }
    await chat.save()
  } catch (err) {
    console.error('modifyCandidates', err)
  } finally {
    lock.release()
  }
}

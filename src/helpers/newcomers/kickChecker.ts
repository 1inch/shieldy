// Import dependencies for the worker
import 'module-alias/register'
import * as dotenv from 'dotenv'
dotenv.config({ path: `${__dirname}/../../../.env` })
import '@models'
// Import the rest
import { Worker, isMainThread, parentPort } from 'worker_threads'
import { findChatsWithCandidates } from '@models/Chat'
import { report } from '@helpers/report'
import { modifyRestrictedUsers } from '@helpers/restrictedUsers'
import { kickCandidates } from '@helpers/newcomers/kickCandidates'
import { Chat } from '@models/Chat'

let checking = false

interface WorkerMessage {
  type: 'candidates' | 'restricted'
  items: any[]
  chat: Chat
}

if (isMainThread) {
  // Create a worker and listen to users to kick
  const worker = new Worker(__filename)
  worker.on('error', console.error)
  worker.on('exit', (code) =>
    console.log(`Kicker checker process stopped with exit code ${code}`)
  )
  worker.on('message', async (message: WorkerMessage) => {
    if (message.type === 'candidates') {
      try {
        await kickCandidates(message.chat, message.items)
      } catch (err) {
        report(err, 'kickCandidatesAfterCheck')
      }
    } else if (message.type === 'restricted') {
      try {
        await modifyRestrictedUsers(message.chat, false, message.items)
      } catch (err) {
        report(err, 'removeRestrictAfterCheck')
      }
    }
  })
} else {
  // Check candidates and tell parent to kick them
  setInterval(async () => {
    if (!checking) {
      check()
    }
  }, 15 * 1000)

  async function check() {
    checking = true
    try {
      const chats = await findChatsWithCandidates()
      console.log(`Found ${chats.length} chats with candidates`)
      for (const chat of chats) {
        // Check candidates
        const candidatesToDelete = []
        for (const candidate of chat.candidates) {
          if (
            new Date().getTime() - candidate.timestamp <
            chat.timeGiven * 1000
          ) {
            continue
          }
          candidatesToDelete.push(candidate)
        }
        if (candidatesToDelete.length) {
          console.log(
            `Kicking ${candidatesToDelete.length} candidates at ${chat.id}`
          )
          parentPort.postMessage({
            type: 'candidates',
            items: JSON.parse(JSON.stringify(candidatesToDelete)),
            chat: JSON.parse(JSON.stringify(chat)),
          })
        }
        // Check restricted users
        const restrictedToDelete = []
        for (const candidate of chat.restrictedUsers) {
          if (
            new Date().getTime() - candidate.timestamp >
            24 * 60 * 60 * 1000
          ) {
            restrictedToDelete.push(candidate)
          }
        }
        if (restrictedToDelete.length) {
          parentPort.postMessage({
            type: 'restricted',
            items: JSON.parse(JSON.stringify(restrictedToDelete)),
            chat: JSON.parse(JSON.stringify(chat)),
          })
        }
      }
    } catch (err) {
      report(err, 'checking candidates')
    } finally {
      console.log('Finished checking chats with candidates')
      checking = false
    }
  }
}

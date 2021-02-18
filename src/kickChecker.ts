import 'module-alias/register'
import * as dotenv from 'dotenv'
dotenv.config({ path: `${__dirname}/../.env` })
import '@models'
import { report } from '@helpers/report'
import { findChatsWithCandidates } from '@models/Chat'
import { kickCandidates } from '@helpers/newcomers/kickCandidates'
import { modifyRestrictedUsers } from '@helpers/restrictedUsers'

let checking = false

// Check candidates
setInterval(async () => {
  console.log(
    'Trying to check candidates, current checking status is',
    checking
  )
  if (!checking) {
    check()
  }
}, 15 * 1000)

async function check() {
  checking = true
  try {
    console.log('Getting chats with candidates')
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
        try {
          await kickCandidates(chat, candidatesToDelete)
        } catch (err) {
          report(err, 'kickCandidatesAfterCheck')
        }
      }
      // Check restricted users
      const restrictedToDelete = []
      for (const candidate of chat.restrictedUsers) {
        if (
          new Date().getTime() - candidate.timestamp >
          (candidate.restrictTime || 24) * 60 * 60 * 1000
        ) {
          restrictedToDelete.push(candidate)
        }
      }
      if (restrictedToDelete.length) {
        try {
          await modifyRestrictedUsers(chat, false, restrictedToDelete)
        } catch (err) {
          report(err, 'removeRestrictAfterCheck')
        }
      }
    }
  } catch (err) {
    report(err, 'checking candidates')
  } finally {
    console.log('Finished checking chats with candidates')
    checking = false
  }
}

console.log('Kicker is up and running')

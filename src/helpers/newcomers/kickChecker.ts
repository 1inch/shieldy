import { findChatsWithCandidates } from '../../models'
import { report } from '../report'
import { modifyRestrictedUsers } from '../restrictedUsers'
import { kickCandidates } from './kickCandidates'

// Check if needs to ban
setInterval(async () => {
  if (!checking) {
    check()
  }
}, 15 * 1000)

let checking = false
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
      }
      try {
        await kickCandidates(chat, candidatesToDelete)
      } catch (err) {
        report(err, 'kickCandidatesAfterCheck')
      }
      // Check restricted users
      const restrictedToDelete = []
      for (const candidate of chat.restrictedUsers) {
        if (new Date().getTime() - candidate.timestamp > 24 * 60 * 60 * 1000) {
          restrictedToDelete.push(candidate)
        }
      }
      try {
        await modifyRestrictedUsers(chat, false, restrictedToDelete)
      } catch (err) {
        report(err, 'removeRestrictAfterCheck')
      }
    }
  } catch (err) {
    report(err, 'checking candidates')
  } finally {
    console.log('Finished checking chats with candidates')
    checking = false
  }
}

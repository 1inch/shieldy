import 'module-alias/register'
import * as dotenv from 'dotenv'
dotenv.config({ path: `${__dirname}/../.env` })
import '@models'
import { report } from '@helpers/report'
import { findMessagesToDelete } from '@models/MessageToDelete'
import { deleteMessageSafeWithBot } from '@helpers/deleteMessageSafe'

let checking = false

// Check candidates
setInterval(async () => {
  if (!checking) {
    check()
  }
}, 5 * 1000)

async function check() {
  checking = true
  try {
    const messages = await findMessagesToDelete()
    await Promise.all(
      messages.map(
        (message) =>
          new Promise<void>(async (res) => {
            try {
              await deleteMessageSafeWithBot(
                message.chat_id,
                message.message_id
              )
              await message.remove()
            } catch {
              // Do nothing
            } finally {
              res()
            }
          })
      )
    )
  } catch (err) {
    report(err, 'deleting messages')
  } finally {
    checking = false
  }
}

console.log('Deleter is up and running')

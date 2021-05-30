import 'module-alias/register'
import * as dotenv from 'dotenv'
dotenv.config({ path: `${__dirname}/../.env` })
import { Context } from 'telegraf'
import { report } from '@helpers/report'
import { bot } from '@helpers/bot'
import { isMaster, fork } from 'cluster'
import { cpus } from 'os'

// Generate cluster workers
const workers = []
if (isMaster) {
  console.info(`Master ${process.pid} is running`)
  for (let i = 0; i < cpus().length; i += 1) {
    const worker = fork()
    workers.push(worker)
  }
} else {
  const handler = require('./updateHandler')
  console.info(`Worker ${process.pid} started`)
  process.on('message', (update) => {
    handler.handleUpdate(update)
  })
}

// Start bot
if (isMaster) {
  bot.use((ctx) => {
    handleCtx(ctx)
  })
  bot
    .launch({
      polling: {
        allowedUpdates: [
          'callback_query',
          'chosen_inline_result',
          'edited_message',
          'inline_query',
          'message',
          'poll',
          'poll_answer',
          'chat_member',
        ] as any,
      },
    })
    .then(() => {
      console.info('Bot on the main thread is up and running')
    })
    .catch(report)
}

// Handle update
let clusterNumber = 0
function handleCtx(ctx: Context) {
  if (clusterNumber >= workers.length) {
    clusterNumber = 0
  }
  const worker = workers[clusterNumber]
  if (worker) {
    clusterNumber += 1
    worker.send(ctx.update)
  }
}

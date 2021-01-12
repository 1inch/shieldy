import 'module-alias/register'
import * as dotenv from 'dotenv'
dotenv.config({ path: `${__dirname}/../../.env` })
import '@models'

import { CappedMessageModel } from '@models/CappedMessage'
import { parentPort } from 'worker_threads'

parentPort.on('message', async (message) => {
  await new CappedMessageModel({
    message_id: message.message_id,
    from_id: message.from.id,
    chat_id: message.chat.id,
  }).save()
})

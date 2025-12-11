import * as mongoose from 'mongoose'
import { setGlobalOptions, Severity } from '@typegoose/typegoose'

mongoose.connect(process.env.MONGO, {
  socketTimeoutMS: 5000,
})

setGlobalOptions({
  options: {
    allowMixed: Severity.ALLOW,
  },
})

import * as mongoose from 'mongoose'
import { setGlobalOptions, Severity } from '@typegoose/typegoose'

mongoose.connect(process.env.MONGO, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

setGlobalOptions({
  options: {
    allowMixed: Severity.ALLOW,
  },
})

import * as mongoose from 'mongoose'

mongoose.connect(process.env.MONGO, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

export * from './Chat'
export * from './CappedMessage'
export * from './VerifiedUser'

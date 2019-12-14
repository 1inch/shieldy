// Dependencies
import * as mongoose from 'mongoose'

// Connect to mongoose
mongoose.connect(process.env.MONGO, {
  useCreateIndex: true,
  useNewUrlParser: true,
})

// Export models
export * from './Chat'
export * from './CappedMessage'

import { getModelForClass, prop } from '@typegoose/typegoose'

export class MessageToDelete {
  @prop({ required: true, index: true })
  message_id: number
  @prop({ required: true, index: true })
  chat_id: number
  @prop({ required: true })
  deleteAt: Date
}

export const MessageToDeleteModel = getModelForClass(MessageToDelete, {
  schemaOptions: { timestamps: true },
})

export function findMessagesToDelete() {
  return MessageToDeleteModel.find({
    deleteAt: { $lte: new Date() },
  })
}

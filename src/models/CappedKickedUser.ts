import { getModelForClass, prop } from '@typegoose/typegoose'

export class CappedKickedUser {
  @prop({ required: true, index: true })
  chatId: number
  @prop({ required: true, index: true })
  userId: number
}

export const CappedKickedUserModel = getModelForClass(CappedKickedUser, {
  schemaOptions: { timestamps: true },
})

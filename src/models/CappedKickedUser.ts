import { getModelForClass, prop } from '@typegoose/typegoose'

export class CappedKickedUser {
  @prop({ required: true, index: true })
  chatId: number
  @prop({ required: true, index: true })
  userId: number
  @prop({ default: Date.now, expires: '2m' })
  createdAtForExpiry: Date
}

export const CappedKickedUserModel = getModelForClass(CappedKickedUser, {
  schemaOptions: { timestamps: true, capped: 1000 * 1024 },
})

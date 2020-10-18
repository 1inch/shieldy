import { prop, getModelForClass } from '@typegoose/typegoose'

export class VerifiedUser {
  @prop({ required: true, index: true, unique: true })
  id: number
}

export const VerifiedUserModel = getModelForClass(VerifiedUser, {
  schemaOptions: { timestamps: true },
})

export async function addVerifiedUser(id: number) {
  let user = await VerifiedUserModel.findOne({ id })
  if (!user) {
    try {
      await new VerifiedUserModel({ id }).save()
    } catch {
      // Do nothing
    }
  }
}

export async function isVerifiedUser(id: number) {
  let user = await VerifiedUserModel.findOne({ id })
  return !!user
}

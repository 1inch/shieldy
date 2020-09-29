import { prop, Typegoose } from 'typegoose'

export class VerifiedUser extends Typegoose {
  @prop({ required: true, index: true, unique: true })
  id: number
}

export const VerifiedUserModel = new VerifiedUser().getModelForClass(
  VerifiedUser,
  {
    schemaOptions: { timestamps: true },
  }
)

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

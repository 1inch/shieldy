import { report } from '@helpers/report'
import { ChatModel } from '@models/Chat'
import { isGroup } from '@helpers/isGroup'
import { ContextMessageUpdate } from 'telegraf'

const administratorsCacheTime = 5

export async function attachAdministrators(ctx: ContextMessageUpdate, next) {
  // If not a group, no need to check for admins
  if (!isGroup(ctx)) {
    ctx.administratorIds = []
    return next()
  }
  // Get cached admins
  const administratorsCache = ctx.dbchat.administratorsCache
  if (
    !!administratorsCache &&
    Date.now() - administratorsCache.updatedAtTimestamp <
      administratorsCacheTime * 1000
  ) {
    ctx.administratorIds = administratorsCache.administratorIds
    return next()
  }
  try {
    // Get new admins
    const administrators = await ctx.getChatAdministrators()
    ctx.administratorIds = administrators.map((a) => a.user.id)
    // Update the cache
    await ChatModel.updateOne(
      { _id: ctx.dbchat._id },
      {
        $set: {
          administratorsCache: {
            updatedAtTimestamp: Date.now(),
            administratorIds: ctx.administratorIds,
          },
        },
      }
    )
  } catch (err) {
    // If getting admins failed, just continue with the middlewares without admins
    report(err)
    ctx.administratorIds = []
  } finally {
    // Exit the middleware
    return next()
  }
}

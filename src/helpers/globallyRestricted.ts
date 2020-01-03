import { Lock } from 'semaphore-async-await'

export let globalyRestricted = []

export async function modifyGloballyRestricted(add: boolean, ids: number[]) {
  const lock = new Lock()
  await lock.acquire()
  try {
    if (add) {
      globalyRestricted = globalyRestricted.concat(ids)
    } else {
      globalyRestricted = globalyRestricted.filter(id => !ids.includes(id))
    }
  } catch (err) {
    console.error('modifyGloballyRestricted', err)
  } finally {
    lock.release()
  }
}

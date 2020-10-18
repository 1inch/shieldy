const globalyRestrictedMap = {} as { [index: number]: boolean }

export function modifyGloballyRestricted(ids: number[], restrict: boolean) {
  for (const id of ids) {
    globalyRestrictedMap[id] = restrict
  }
}

export function isGloballyRestricted(id: number) {
  return !!globalyRestrictedMap[id]
}

import { User } from 'telegraf/typings/telegram-types'

export function getUsername(user: User, link = false) {
  return `${user.username ? `@${user.username}` : getName(user, link)}`
}

export function getName(user: User, link = false) {
  const linkStart = link ? `<a href="tg://user?id=${user.id}">` : ''
  const linkEnd = link ? '</a>' : ''
  return `${linkStart}${user.first_name}${
    user.last_name ? ` ${user.last_name}` : ''
  }${linkEnd}`
}

export function getLink(user: User) {
  return `tg://user?id=${user.id}`
}

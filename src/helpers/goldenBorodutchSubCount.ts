import axios from 'axios'

let over10000 = true

export function isOver10000() {
  return false
  // return over10000
}

setInterval(async () => {
  try {
    const response = (await axios('https://stats.borodutch.com/stats')).data
    over10000 = response.goldenBorodutch.subCount > 10000
  } catch {
    // Do nothing
  }
}, 60 * 1000)

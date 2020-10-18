import { Equation } from '@models/Chat'

export function generateEquation() {
  const a = getRandomInt(10)
  const b = getRandomInt(10)
  return {
    question: `${a} + ${b}`,
    answer: `${a + b}`,
  } as Equation
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max)) + 1
}

import { test, expect } from 'vitest'
import fc from 'fast-check'

class Turnstyle {
  locked: boolean
  wantsAmount: number

  constructor(value: number) {
    this.locked = true
    this.wantsAmount = value
  }

  insertCoin = (size: number) => {
    this.locked = size >= this.wantsAmount
  }
  push = () => {
    const isUnlocked = !this.locked
    this.locked = true
    return isUnlocked
  }
}

type Model = { spent: number }

class InsertCoinCommand implements fc.Command<Model, Turnstyle> {
  constructor(readonly value: number) { this.value = value }

  check = (m: Readonly<Model>) => true

  run(m: Model, r: Turnstyle): void {
    r.insertCoin(this.value)
    m.spent += this.value
    expect(r.locked).toEqual(this.value >= r.wantsAmount)
  }

  toString = () => `insert(${this.value})`
}

class PushCommand implements fc.Command<Model, Turnstyle> {
  check = (m: Readonly<Model>) => true
  run(m: Model, r: Turnstyle): void {
    const wasLocked = r.locked
    const pushHappened = r.push()
    expect(wasLocked).not.toEqual(pushHappened)
    expect(r.locked).toBe(true)
  }
  toString = () => 'push()'
}

test("turnstyle", () => {
  const allCommands = [
    fc.nat().map(v => new InsertCoinCommand(v)),
    fc.constant(new PushCommand()),
  ]
  fc.assert(
    fc.property(
      fc.nat(),
      fc.commands(allCommands, { size: '+1' }),
      (tsVal, cmds) => {
        const s = () => ({
          model: <Model>{},
          real: new Turnstyle(tsVal)
        })
        fc.modelRun(s, cmds)
      }
    ),
    // { verbose: 2 }
  )
})

import { test, expect } from 'vitest'
import fc from 'fast-check'

type Jug = { amt: number, cap: number, wants: number }

const jug = (startsWith, cap, wants) => <Jug>{ amt: startsWith, cap, wants }

class JugSet {
  jugs: Jug[]

  constructor(jugs: Jug[]) {
    this.jugs = [...jugs]
  }

  pour(from: number, to: number) {
    const oldToAmt = this.jugs[to].amt
    this.jugs[to].amt = Math.min(this.jugs[to].cap, this.jugs[to].amt + this.jugs[from].amt)
    this.jugs[from].amt = this.jugs[from].amt - (this.jugs[to].amt - oldToAmt)
  }
}

type Model = {
  count: number
}

class PourCommand implements fc.Command<Model, JugSet> {
  amts: number[]

  constructor(readonly from: number, readonly to: number) { }

  check = (_: Model) => true

  run(m: Model, r: JugSet): void {
    r.pour(this.from, this.to)

    // ensure no physics violations
    expect(r.jugs[this.from].amt).toBeGreaterThanOrEqual(0)
    expect(r.jugs[this.from].amt).toBeLessThanOrEqual(r.jugs[this.from].cap)
    expect(r.jugs[this.to].amt).toBeGreaterThanOrEqual(0)
    expect(r.jugs[this.to].amt).toBeLessThanOrEqual(r.jugs[this.to].cap)

    this.amts = r.jugs.map(j => j.amt)
    expect(r.jugs.map(j => j.amt)).not.toEqual(r.jugs.map(j => j.wants))
    m.count++
  }

  toString = () => `pour(${this.from}, ${this.to})[${this.amts}]`
}

test("the water pouring problem", () => {
  const jugs = () => ([
    jug(8, 8, 4),
    jug(0, 5, 4),
    jug(0, 3, 0),
  ])

  const randomJug = fc.nat(jugs().length - 1)
  const pourer = fc.tuple(randomJug, randomJug)
    .filter(([from, to]) => from != to)
    .map(([from, to]) => new PourCommand(from, to))
  fc.assert(
    fc.property(
      fc.commands([pourer], { size: "large" }),
      (cmds) => {
        const s = () => ({
          model: <Model>{ count: 0 },
          real: new JugSet(jugs())
        })
        // uncomment me for the solution
        // fc.modelRun(s, cmds)
      }
    )
  )
})

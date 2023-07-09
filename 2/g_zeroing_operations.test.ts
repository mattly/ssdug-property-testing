import { test, expect } from 'vitest'
import fc from 'fast-check'
import set from './set'

test("n times zero", () => {
  fc.assert(
    fc.property(
      fc.nat(),
      n => { expect(n * 0).toEqual(0) }
    ))
})

test("set intersection with empty", () => {
  fc.assert(
    fc.property(
      fc.array(fc.integer()).map(nums => new Set(nums)),
      ns => { expect(set.intersect(ns, new Set())).toEqual(new Set()) }
    ))
})

test("removing items from empty set", () => {
  fc.property(
    fc.integer(),
    n => {
      const s = new Set()
      s.delete(n)
      expect(s).toEqual(new Set())
    }
  )
})

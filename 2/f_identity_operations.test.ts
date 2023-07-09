import { test, expect } from 'vitest'
import fc from 'fast-check'
import set from './set'

test("n plus zero", () => {
  fc.assert(
    fc.property(
      fc.float({ noDefaultInfinity: true, noNaN: true }).map(n => n == 0 ? 0 : n),
      n => { expect(n + 0).toEqual(n) }
    ))
})

test("n times 1", () => {
  fc.assert(
    fc.property(
      fc.float({ noDefaultInfinity: true, noNaN: true }),
      n => { expect(n * 1).toEqual(n) }
    ))
})

test("n divided by one", () => {
  fc.assert(fc.property(
    fc.float({ noDefaultInfinity: true, noNaN: true }),
    n => { expect(n / 1).toEqual(n) }
  ))
})

test("str + empty", () => {
  fc.assert(
    fc.property(
      fc.string(),
      str => { expect(str + "").toEqual(str) }
    ))
})

test("set union w/ empty", () => {
  fc.assert(
    fc.property(
      fc.array(fc.integer()).map(nums => new Set(nums)),
      s => { expect(set.union(s, new Set())).toEqual(s) }
    ))
})

test("set difference with empty", () => {
  fc.assert(
    fc.property(
      fc.array(fc.integer()).map(nums => new Set(nums)),
      s => { expect(set.difference(s, new Set())).toEqual(s) }
    ))
})

const emptyObj = {}
test("object merge with empty object", () => {
  fc.assert(
    fc.property(
      fc.object(),
      obj => { expect({ ...obj, ...emptyObj }).toEqual(obj) }
    ))
})

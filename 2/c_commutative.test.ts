import { test, expect } from 'vitest'
import fc from 'fast-check'
import set from './set'

test("addition is commutative", () => {
  fc.assert(
    fc.property(fc.float(), fc.float(), (a, b) => { expect(a + b).toEqual(b + a) }))
})

test("multiplication is commutative", () => {
  fc.assert(
    fc.property(fc.float(), fc.float(), (a, b) => { expect(a * b).toEqual(b * a) }))
})

test("set intersection is commutative", () => {
  fc.assert(
    fc.property(
      fc.array(fc.integer()).map(nums => new Set(nums)),
      fc.array(fc.integer()).map(nums => new Set(nums)),
      (setA, setB) => { expect(set.intersect(setA, setB)).toEqual(set.intersect(setB, setA)) }
    ),
    { verbose: 2 }
  )
})

import { test, expect } from 'vitest'
import fc from 'fast-check'

test("addition is associaitve", () => {
  fc.assert(
    fc.property(
      fc.nat(), fc.nat(), fc.nat(),
      (a, b, c) => { expect((a + b) + c).toEqual(a + (b + c)) }
    ))
})

test("numeric min/maxing is associaitve", () => {
  fc.assert(
    fc.property(
      fc.nat(), fc.nat(), fc.nat(),
      (a, b, c) => {
        expect(Math.max(Math.max(a + b)) + c).toEqual(Math.max(a + Math.max(b + c)))
        expect(Math.min(Math.min(a + b)) + c).toEqual(Math.min(a + Math.min(b + c)))
      }
    ))
})

test("string concatenation is associaitve", () => {
  fc.assert(
    fc.property(
      fc.string(), fc.string(), fc.string(),
      (a, b, c) => { expect(a + (b + c)).toEqual((a + b) + c) }
    ))
})

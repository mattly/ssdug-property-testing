import { test, expect } from 'vitest'
import fc from 'fast-check'

test("squaring numbers results in a positive number", () => {
  fc.assert(
    fc.property(
      fc.float({ noDefaultInfinity: true, noNaN: true }),
      n => { expect(Math.sign(n * n)).toBeGreaterThanOrEqual(0) }
    )
  )
})

test("triangle inequality", () => {
  // min/max boundaries explore the limits of float precision
  const posFloat = fc.double({ noDefaultInfinity: true, noNaN: true, min: 1e-6, max: 1e10 })
  fc.assert(
    fc.property(
      fc.record({ a: posFloat, b: posFloat }),
      ({ a, b }) => {
        expect(
          a + b
        ).toBeGreaterThan(
          Math.sqrt(a * a + b * b) // a^2 + b^2 = c^2
        )
      }
    )
  )
})

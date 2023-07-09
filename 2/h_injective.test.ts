import { test, expect } from 'vitest'
import fc from 'fast-check'
import crypto from 'crypto'

test("hashing different values", () => {
  fc.assert(
    fc.property(
      fc.tuple(fc.string(), fc.string()).filter(([a, b]) => a != b),
      ([a, b]) => {
        expect(
          crypto.createHash('sha512').update(a).digest('hex')
        ).not.toEqual(
          crypto.createHash('sha512').update(b).digest('hex')
        )
      }
    ),
  )
})

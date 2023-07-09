import { test, expect } from 'vitest'
import fc from 'fast-check'

test("string capitalization is distributive", () => {
  fc.assert(
    fc.property(
      fc.string(), fc.string(),
      (a, b) => {
        expect((a + b).toUpperCase()).toEqual(a.toUpperCase() + b.toUpperCase())
        expect((a + b).toLowerCase()).toEqual(a.toLowerCase() + b.toLowerCase())
      }
    ))
})

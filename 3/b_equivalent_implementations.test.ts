import { test, expect } from 'vitest'
import fc from 'fast-check'

const sortStrWith = (f) => (a, b) => {
  const fa = f(a)
  const fb = f(b)
  if (fa == fb) { return 0 }
  return fa > fb ? 1 : -1
}

test("case-insensitive string sorting", () => {
  fc.assert(
    fc.property(
      fc.array(fc.stringMatching(/^[a-zA-Z0-9\s]*$/)),
      (strs) => {
        expect([...strs].sort(sortStrWith(s => s.toUpperCase())))
          .toEqual([...strs].sort(sortStrWith(s => s.toLowerCase())))
      }
    )
  )
})

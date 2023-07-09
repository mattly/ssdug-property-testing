import { test, expect } from 'vitest'
import fc from 'fast-check'
import add from './add'

test("adds example numbers", () => {
  const testCases = [
    { a: 1, b: 1, wants: 2 },
    { a: -1, b: 1, wants: 0 },
  ]

  testCases.forEach(tc => {
    expect(add(tc.a, tc.b)).toEqual(tc.wants)
  })
})

// const posNum = fc.nat().filter(n => n > 0)
// test("for two positive numbers, result is greater than either", () => {
//   fc.assert(
//     fc.property(posNum, posNum, (a, b) => {
//       const result = add(a, b)
//       expect(result).toBeGreaterThan(a)
//       expect(result).toBeGreaterThan(b)
//     }),
//   )
// })

// test("result is the same regardless of order", () => {
//   fc.assert(
//     fc.property(fc.float(), fc.float(), (a, b) => {
//       expect(add(a, b)).toEqual(add(b, a))
//     })
//   )
// })

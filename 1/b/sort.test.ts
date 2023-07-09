import { test, expect } from 'vitest'
import fc from 'fast-check'
import sort from './sort'

test("sorts examples monotonically", () => {
  const testCases = [
    { given: [1, 2, 3, 4], wants: [1, 2, 3, 4] },
    { given: [4, 3, 2, 1], wants: [1, 2, 3, 4] },
  ]

  testCases.forEach(tc => {
    expect(sort(tc.given)).toEqual(tc.wants)
  })
})

// test("sorts generated values monotonically", () => {
//   fc.assert(
//     fc.property(fc.array(fc.integer()), nums => {
//       const result = sort(nums)
//       for (let i = 1; i < result.length; i++) {
//         expect(result[i - 1]).toBeLessThanOrEqual(result[i])
//       }
//     }),
//   )
// })

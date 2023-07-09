import { test, expect } from 'vitest'
import fc from 'fast-check'

test("collection filtering is idempotent", () => {
  const even = (n: number) => n % 2 == 0
  fc.assert(
    fc.property(fc.array(fc.integer()), (nums) => {
      expect(nums.filter(even)).toEqual(nums.filter(even).filter(even))
    }))
})

test("collection sorting is idempotent", () => {
  fc.assert(
    fc.property(fc.array(fc.string()), strs => {
      expect([...strs].sort()).toEqual([...strs].sort().sort())
    }))
})

test("string trimming is idempotent", () => {
  fc.assert(
    fc.property(fc.string(), str => {
      expect(str.trim()).toEqual(str.trim().trim())
    }))
})

test("set adding an item", () => {
  fc.assert(
    fc.property(
      fc.array(fc.integer()),
      fc.integer(),
      (s, n) => {
        const sAddOnce = new Set(s)
        sAddOnce.add(n)
        const sAddTwice = new Set(s)
        sAddTwice.add(n)
        sAddTwice.add(n)
        expect(sAddOnce).toEqual(sAddTwice)
      }))
})

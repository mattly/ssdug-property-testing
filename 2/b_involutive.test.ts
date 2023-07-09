import { test, expect } from 'vitest'
import fc from 'fast-check'

test("array reversing is undoes the reverse", () => {
  fc.assert(
    fc.property(fc.array(fc.string()), strs => {
      const twiceReversed = [...strs]
      twiceReversed.reverse()
      twiceReversed.reverse()
      expect(twiceReversed).toEqual(strs)
    }))
})

test("iso8601 formatting / parsing", () => {
  fc.assert(
    fc.property(
      fc.date(),
      date => { expect(new Date(Date.parse(date.toISOString()))).toEqual(date) }
    ))
})

test("json serialization / deserialization", () => {
  fc.assert(
    fc.property(
      fc.object({
        // root leaf values, will construct arrays and sub-objects of these
        values: [
          fc.boolean(),
          fc.float({ noDefaultInfinity: true, noNaN: true }).map(n => n == 0 ? 0 : n), // -0 will be reserialized as +0
          fc.string()]
      }),
      obj => { expect(JSON.parse(JSON.stringify(obj))).toEqual(obj) }
    ))
})

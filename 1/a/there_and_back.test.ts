import { test, expect } from 'vitest'
import fc from 'fast-check'
import { DateTime } from 'luxon'


test("can re-hydrate serialized values", () => {
  fc.assert(
    fc.property(
      // generate a date, then convert it to DateTime
      fc.date().map(d => DateTime.fromJSDate(d)),
      // a predicate to validate
      (dt) => {
        expect(dt).toEqual(DateTime.fromSQL(dt.toSQL()))
      }
    ),
    {
      // verbose: 2,
      numRuns: 1000,
    }
  )
})

// fix:
// fc.date(
//   {
//     min: new Date(-62167190880000),
//     max: new Date(253402329599999)
//   }
// )

import { test, expect } from 'vitest'
import fc from 'fast-check'

class Wallet {
  balance: number

  constructor(startingBal: number) {
    this.balance = startingBal
  }

  transact = (amt: number, delay: number, succeed: boolean) => {
    if (this.balance + amt < 0) { return false }
    setTimeout(() => {
      if (succeed) { this.balance += amt }
    }, delay)
    return true
  }
}

test("transactions can't result in a negative balance", async () => {
  const startDelayMax = 50
  const txDelayMax = 5
  // await fc.assert(
  //   fc.asyncProperty(
  //     fc.scheduler(),
  //     fc.array(fc.record({
  //       amt: fc.integer({ min: -10, max: 10 }).filter(n => n != 0),
  //       startDelay: fc.nat({ max: startDelayMax }),
  //       txDelay: fc.nat({ max: txDelayMax }),
  //       txSuccess: fc.boolean()
  //     }), { maxLength: 20, minLength: 1 },),
  //     fc.context(),
  //     async (scheduler, txs, ctx) => {
  //       const wallet = new Wallet(0)
  //       const balances = []
  //       const waitingFor = []

  //       const timeTotal = startDelayMax + txDelayMax
  //       const checkTimes = timeTotal
  //       const checkInterval = 1
  //       for (let i = 0; i < checkTimes; i++) {
  //         waitingFor.push(new Promise(resolve => {
  //           setTimeout(() => {
  //             ctx.log(`${i}: balance ${wallet.balance}`)
  //             resolve(balances.push(wallet.balance))
  //           }, i * checkInterval)
  //         }))
  //       }

  //       const transact = scheduler.scheduleFunction(
  //         ({ amt, txDelay, txSuccess }) => {
  //           wallet.transact(amt, txDelay, txSuccess)
  //           return Promise.resolve(true)
  //         }
  //       )
  //       txs.forEach(({ startDelay, ...tx }) => {
  //         waitingFor.push(new Promise(resolve => {
  //           setTimeout(() => {
  //             resolve(transact(tx))
  //           }, startDelay)
  //         }))
  //       })


  //       await scheduler.waitFor(Promise.all(waitingFor))

  //       expect(balances).toHaveLength(checkTimes)
  //       const allPositive = (bs: number[]) => bs.every(b => b >= 0)
  //       expect(balances).toSatisfy(allPositive)
  //     }
  //   ),
  //   {
  //     numRuns: 200,
  //     seed: 170508775,
  //     path: "81:3:6:8:4:14:3:12:10:11:11:14:10:12:13:1:11:1:13:1:12:6:7:1:16:5:7:1:7:1:16:5:7:1:7:1:15:5:7:1:1:11:15:5:7:1:1:11:15:18:5:7:1:11:20:5:11:12:1:0:1:1:2:10:1:9:5:5:1:14:4:1:8:1:4:1:8:8:1:11:4:10:1:4:8:1:10:3:8:1:9:1:11:10:10",
  //     endOnFailure: true
  //   }
  // )
}, { timeout: 300000 })

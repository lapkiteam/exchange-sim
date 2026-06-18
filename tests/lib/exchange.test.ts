import { describe, expect, it } from "vitest"
import { pipeInto } from "ts-functional-pipe"

import { Exchange } from "../../src/lib/exchange"

describe("Exchange", () => {
  it("swap item1, item3", async () => {
    const item1 = { name: "item1" }
    const item2 = { name: "item2" }
    const item3 = { name: "item3" }
    const item4 = { name: "item4" }
    expect(
      pipeInto(
        Exchange.create({
          id: "first",
          inventory: [item1, item2],
        }, {
          id: "second",
          inventory: [item3, item4],
        }),
        exchange => Exchange.setFirst(
          exchange,
          [item1],
          [item2],
        ),
        exchange => Exchange.setSecond(
          exchange,
          [item3],
          [item4],
        ),
        Exchange.commit,
      )
    ).toStrictEqual({
      first: [item2, item3],
      second: [item4, item1],
    })
  })
})

import update from "immutability-helper"

import { type Item } from "./exchange"

export type Inventory = Item[]

export namespace Inventory {
  export function setItemAt(
    inventory: Inventory,
    newItem: Item,
    index: number,
  ): Inventory {
    return update(inventory, {
      [index]: { $set: newItem }
    })
  }

  export function removeItem(
    inventory: Inventory,
    index: number,
  ): Inventory {
    return update(inventory, {
      $splice: [[index]]
    })
  }
}

import update from "immutability-helper"

import { Inventory } from "./inventory"

export type PlayerId = string

export type Player = {
  id: PlayerId
  inventory: Inventory
}

export namespace Player {
  export function setInventory(
    player: Player,
    newInventory: Inventory,
  ): Player {
    return update(player, {
      inventory: {
        $set: newInventory
      }
    })
  }

  export function updateInventory(
    player: Player,
    updating: (inventory: Inventory) => Inventory,
  ): Player {
    return update(player, {
      inventory: {
        $apply: updating
      }
    })
  }
}

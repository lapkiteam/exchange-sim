import { Inventory } from "./inventory"

export type PlayerId = string

export type Player = {
  id: PlayerId
  inventory: Inventory
}

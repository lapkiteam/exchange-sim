import update from "immutability-helper"
import { writable } from "svelte/store"

import { type Item } from "../lib/item"
import { type Player, type PlayerId } from "../lib/player"

export type Players = Map<PlayerId, Player>

export namespace Players {
  export function setPlayer(
    players: Players,
    updatedPlayer: Player,
  ): Players {
    return update(players, {
      [updatedPlayer.id]: {
        $set: updatedPlayer
      }
    })
  }
}

const items: Item[] = [
  {
    name: "Микрофон с перегрузом",
    image: {
      src: "items/microphone.webp",
      alt: "microphone",
    },
  },
  {
    name: "Отпечаток лапки",
    image: undefined,
  },
  {
    name: "Кусь",
    image: undefined,
  },

]

export const players = (() => {
  const players: Players = new Map([
    {
      id: "firstPlayer",
      inventory: [],
    },
    {
      id: "secondPlayer",
      inventory: [
        ...items,
      ],
    },
  ].map(p => [p.id, p]))

  return writable<Players>(players)
})()

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

export const currentPlayerId = "you"

export const players = (() => {
  const players: Players = new Map([
    {
      id: currentPlayerId,
      name: "Ты",
      inventory: [],
    },
    {
      id: "agent",
      name: "Агент",
      inventory: [
        {
          name: "Шляпа",
          image: undefined,
        },
        {
          name: "Плащ",
          image: undefined,
        },
        {
          name: "Циркулярка",
          image: {
            src: "items/circular-saw.webp",
            alt: "circular-saw",
          },
        },
        {
          name: "Шнур от компьютера",
          image: {
            src: "items/cable.webp",
            alt: "cable",
          },
        },
        {
          name: "Кисточка",
          image: {
            src: "items/brush.webp",
            alt: "brush",
          },
        },
      ],
    },
    {
      id: "adalinda",
      name: "Адалинда",
      inventory: [
        {
          name: "Перо",
          image: {
            src: "items/feather.webp",
            alt: "feather",
          },
        },
        {
          name: "Нимб",
          image: undefined,
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
    },
    {
      id: "outscout",
      name: "Аутскаут",
      inventory: [
        {
          name: "Ирокез",
          image: undefined,
        },
        {
          name: "Нашивка с енотом",
          image: undefined,
        },
        {
          name: "Красный галстук",
          image: undefined,
        },
        {
          name: "Микрофон с перегрузом",
          image: {
            src: "items/microphone.webp",
            alt: "microphone",
          },
        },
      ]
    },
    {
      id: "tuatara",
      name: "Туатара",
      inventory: [
        {
          name: "Шляпа",
          image: undefined,
        },
        {
          name: "Посох",
          image: undefined,
        },
        {
          name: "Одежда",
          image: undefined,
        },
        {
          name: "Сережка",
          image: {
            src: "items/earring.webp",
            alt: "earring",
          },
        },
        {
          name: "Виар",
          image: undefined,
        },
      ],
    },
    {
      id: "netlenij",
      name: "Нетленный",
      inventory: [
        {
          name: "Надкушенная сосиска",
          image: undefined,
        },
        {
          name: "Бутылка пойла",
          image: {
            src: "items/alcohol.webp",
            alt: "бутылка",
          },
        },
        {
          name: "Гениальная идея",
          image: undefined,
        },
        {
          name: "Золотой гусь",
          image: undefined,
        },
      ]
    },
  ].map(p => [p.id, p]))

  return writable<Players>(players)
})()

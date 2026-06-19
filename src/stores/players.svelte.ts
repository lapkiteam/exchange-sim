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
          image: {
            src: "items/hat.webp",
            alt: "hat",
          },
        },
        {
          name: "Плащ",
          image: {
            src: "items/raincoat.webp",
            alt: "raincoat",
          },
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
          image: {
            src: "items/halo.webp",
            alt: "halo",
          },
        },
        {
          name: "Отпечаток лапки",
          image: {
            src: "items/paw.webp",
            alt: "paw",
          },
        },
        {
          name: "Кусь",
          image: {
            src: "items/bite.webp",
            alt: "bite",
          },
        },
      ]
    },
    {
      id: "outscout",
      name: "Аутскаут",
      inventory: [
        {
          name: "Ирокез",
          image: {
            src: "items/iroquois.webp",
            alt: "iroquois",
          },
        },
        {
          name: "Нашивка с енотом",
          image: {
            src: "items/raccoon-patch.webp",
            alt: "raccoon-patch",
          },
        },
        {
          name: "Красный галстук",
          image: {
            src: "items/red-tie.webp",
            alt: "red-tie",
          },
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
          name: "Волшебная шляпа",
          image: {
            src: "items/wizzard-hat.webp",
            alt: "wizzard-hat",
          },
        },
        {
          name: "Посох",
          image: {
            src: "items/staff.webp",
            alt: "staff",
          },
        },
        {
          name: "Одежда волшебницы",
          image: {
            src: "items/wizzard-cloth.webp",
            alt: "wizzard-cloth",
          },
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
          image: {
            src: "items/vr.webp",
            alt: "vr",
          },
        },
      ],
    },
    {
      id: "netlenij",
      name: "Нетленный",
      inventory: [
        {
          name: "Надкушенная сосиска",
          image: {
            src: "items/sausage.webp",
            alt: "sausage",
          },
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
          image: {
            src: "items/idea.webp",
            alt: "idea",
          },
        },
        {
          name: "Золотой гусь",
          image: {
            src: "items/golden-goose.webp",
            alt: "golden-goose",
          },
        },
      ]
    },
  ].map(p => [p.id, p]))

  return writable<Players>(players)
})()

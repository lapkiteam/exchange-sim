<script lang="ts">
  import { push } from "svelte-spa-router"

  import { concat } from "../lib/utils"
  import type { Item } from "../lib/item"
  import type { Player } from "../lib/player"
  import { Exchange } from "../lib/exchange"
  import PlayerWindow from "../components/PlayerWindow.svelte"

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

  const firstPlayer: Player = [
    ...items,
    ...items,
  ]
  const secondPlayer: Player = [
    ...items,
  ]

  let exchange: Exchange = Exchange.create(
    firstPlayer, secondPlayer)

  function back() {
    push("/")
  }
</script>

<div class={concat([
  "flex",
  "flex-col",
  "size-full",
  "gap-3",
])}>
  <div class={concat([
    "overflow-y-auto",
    "size-full",
  ])}>
    <PlayerWindow
      inventory={firstPlayer}
      setAgreed={newAgreed => {
        const { updatedExchange, bothAgreed } =
          Exchange.setFirstAgreed(exchange, newAgreed)
        exchange = updatedExchange
        if (bothAgreed) { back() }
      }}
    />
  </div>
  <div class={concat([
    "flex",
    "justify-center",
  ])}>
    <hr class={concat([
      "w-[80%]",
    ])} />
  </div>
  <div class={concat([
    "overflow-y-auto",
    "size-full",
  ])}>
    <PlayerWindow
      inventory={secondPlayer}
      setAgreed={newAgreed => {
        const { updatedExchange, bothAgreed } =
          Exchange.setSecondAgreed(exchange, newAgreed)
        exchange = updatedExchange
        if (bothAgreed) { back() }
      }}
    />
  </div>
</div>

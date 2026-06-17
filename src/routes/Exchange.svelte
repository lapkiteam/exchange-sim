<script lang="ts">
  import { push } from "svelte-spa-router"

  import { concat } from "../lib/utils"
  import type { Inventory } from "../lib/inventory"
  import type { Item } from "../lib/item"
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

  const firstPlayer: Inventory = [
    ...items,
    ...items,
  ]
  const secondPlayer: Inventory = [
    ...items,
  ]

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
      agreed={() => { back() }}
      disagreed={() => { back() }}
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
      agreed={() => { back() }}
      disagreed={() => { back() }}
    />
  </div>
</div>

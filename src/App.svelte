<script lang="ts">
  import { concat } from "./lib/utils"
  import type { Inventory } from "./lib/inventory"
  import type { Item } from "./lib/item"
  import Exchange from "./components/Exchange.svelte"

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
</script>

<main>
  <div class={concat([
    "flex",
    "justify-center",
    "bg-gray-200",
    "dark:bg-gray-800",
    "dark:text-white",
  ])}>
    <div class={concat([
      "relative", // for children with absolute
      "w-full",
      "h-dvh",
      "h-[calc(var(--vh,_1vh)_*_100)]",
      "p-2",
    ])}>
      <Exchange
        firstPlayer={firstPlayer}
        secondPlayer={secondPlayer}
      />
    </div>
  </div>
</main>

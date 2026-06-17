<script lang="ts">
  import { concat } from "./lib/utils"
  import type { Inventory } from "./lib/inventory"
  import type { Item } from "./lib/item"
  import PlayerWindow from "./components/PlayerWindow.svelte"

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
  ])}>
    <div class={concat([
      "relative", // for children with absolute
      "w-full",
      "h-dvh",
      "h-[calc(var(--vh,_1vh)_*_100)]",
      "bg-gray-200",
      "dark:bg-gray-800",
      "dark:text-white",
      "flex",
      "flex-col",
      "p-2",
      "gap-3",
    ])}>
      <div class={concat([
        "grow",
        "overflow-y-auto",
        "size-full",
      ])}>
        <PlayerWindow
          inventory={firstPlayer}
          agreed={() => {}}
          disagreed={() => {}}
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
        "grow",
        "overflow-y-auto",
        "size-full",
      ])}>
        <PlayerWindow
          inventory={secondPlayer}
          agreed={() => {}}
          disagreed={() => {}}
        />
      </div>
    </div>
  </div>
</main>

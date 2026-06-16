<script lang="ts">
  import { concat } from "./lib/utils"
  import type { Inventory } from "./lib/inventory"
  import PlayerWindow from "./components/PlayerWindow.svelte"

  const firstPlayer: Inventory = [
    "вафля",
    "надкусанная сосиска",
    "золотой гусь",
  ]
  const secondPlayer: Inventory = [
    "кусь",
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
    ])}>
      <PlayerWindow
        inventory={firstPlayer}
        agreed={() => {}}
        disagreed={() => {}}
      />
      <PlayerWindow
        inventory={secondPlayer}
        agreed={() => {}}
        disagreed={() => {}}
      />
    </div>
  </div>
</main>

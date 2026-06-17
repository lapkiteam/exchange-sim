<script lang="ts">
  import { concat } from "./lib/utils"
  import type { Inventory } from "./lib/inventory"
  import PlayerWindow from "./components/PlayerWindow.svelte"

  const firstPlayer: Inventory = [
    "вафля",
    "надкусанная сосиска",
    "золотой гусь",
    "вафля",
    "надкусанная сосиска",
    "золотой гусь",
    "вафля",
    "надкусанная сосиска",
    "золотой гусь",
    "вафля",
    "надкусанная сосиска",
    "золотой гусь",
    "вафля",
    "надкусанная сосиска",
    "золотой гусь",
    "вафля",
    "надкусанная сосиска",
    "золотой гусь",
    "вафля",
    "надкусанная сосиска",
    "золотой гусь",
    "вафля",
    "надкусанная сосиска",
    "золотой гусь",
  ]
  const secondPlayer: Inventory = [
    "кусь",
    "вафля",
    "надкусанная сосиска",
    "золотой гусь",
    "вафля",
    "надкусанная сосиска",
    "золотой гусь",
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

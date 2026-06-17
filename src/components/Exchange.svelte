<script lang="ts">
  import { concat } from "../lib/utils"
  import type { Inventory } from "../lib/inventory"
  import PlayerWindow from "./PlayerWindow.svelte"

  export let firstPlayer: Inventory
  export let secondPlayer: Inventory
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

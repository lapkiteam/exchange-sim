<script lang="ts">
  import { concat } from "../lib/utils"
  import type { Item } from "../lib/item"
  import ItemView from "./Item.svelte"

  export let title
  export let items: Item[]
  export let onClick: ((itemIndex: number) => void)
</script>

<div class={concat([
  "size-full",
  "overflow-y-auto",
  "flex",
  "flex-col",
  "gap-1",
])}>
  <h2 class={concat([
    "text-xl",
  ])}>{title}</h2>
  <ul class={concat([
    "pl-1",
    "overflow-y-auto",
  ])}>
    {#each items as item, itemIndex}
      <li>
        <button on:click={_ => {
          onClick(itemIndex)
        }}>
          <ItemView item={item}/>
        </button>
      </li>
    {/each}
  </ul>
</div>

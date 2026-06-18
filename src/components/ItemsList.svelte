<script lang="ts">
  import { concat } from "../lib/utils"

  export let title
  export let items: any[]
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
          <slot item={item} index={itemIndex} />
        </button>
      </li>
    {/each}
  </ul>
</div>

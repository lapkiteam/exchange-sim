<script lang="ts">
  import { concat } from "../lib/utils"
  import type { Item } from "../lib/item"

  export let item: Item
</script>

<div class={concat([
  "flex",
  "items-center",
  "gap-2",
])}>
  {#if item.image}
    <img
      class={concat([
        "shrink-0",
        "size-8",
        "object-contain",
      ])}
      src={item.image.src}
      alt={item.image.alt}
    />
  {/if}
  <div class={concat([
    "text-left"
  ])}>{item.name}</div>
</div>

<script lang="ts">
  import { concat } from "../lib/utils"
  import type { Item } from "../lib/exchange"

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
        "size-8",
        // "bg-red-500",
        "object-contain",
      ])}
      src={item.image.src}
      alt={item.image.alt}
    />
  {/if}
  <div>{item.name}</div>
</div>

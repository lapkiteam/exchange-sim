<script lang="ts">
  import { push } from "svelte-spa-router"

  import { concat } from "../lib/utils"
</script>

<div class={concat([
  "size-full",
  "flex",
  "justify-center",
  "items-center",
])}>
  <button
    class={concat([
      "bg-blue-500",
      "p-2",
    ])}
    on:click={() => {
      push("/exchange/firstPlayer/secondPlayer")
    }}
  >
    Начать обмен
  </button>
</div>

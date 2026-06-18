<script lang="ts">
  import { type RouteDefinition } from "svelte-spa-router"
  import Router from "svelte-spa-router"

  import { concat } from "./lib/utils"
  import Exchange from "./routes/Exchange.svelte"
  import Home from "./routes/Home.svelte"

  const routes: RouteDefinition = {
    "/": Home,
    "/exchange/:firstPlayerId/:secondPlayerId": Exchange,
  }
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
      <Router routes={routes} />
    </div>
  </div>
</main>

<script lang="ts">
  import { push } from "svelte-spa-router"

  import { concat } from "../lib/utils"
  import type { Player } from "../lib/player"
  import { players as playersStorage, currentPlayerId } from "../stores/players.svelte"
  import ItemsList from "../components/ItemsList.svelte"

  const players = (() => {
    const rest = new Array<Player>()
    $playersStorage.forEach(player => {
      if (player.id === currentPlayerId) {
        return
      }
      rest.push(player)
    })
    return rest
  })()
</script>

<div class={concat([
  "size-full",
  "flex",
  "flex-col",
  "pt-28",
  "items-center",
  "gap-10",
])}>
  <h1 class={concat([
    "text-4xl",
    "text-center",
  ])}>Симулятор обмена</h1>
  <ItemsList
    title="Обменяться с:"
    items={players}
    onClick={itemIndex => {
      const player = players[itemIndex]
      if (!player) { return }
      push(`/exchange/${currentPlayerId}/${player.id}`)
    }}
    sizeMin
    let:item
  >
    {item.name}
  </ItemsList>
</div>

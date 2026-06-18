<script lang="ts">
  import { push } from "svelte-spa-router"

  import { concat } from "../lib/utils"
  import { Player } from "../lib/player"
  import { Exchange } from "../lib/exchange"
  import { Inventory } from "../lib/inventory"
  import { Players, players } from "../stores/players.svelte"
  import PlayerWindow from "../components/PlayerWindow.svelte"

  const firstPlayer: Player = $players.get("firstPlayer") as Player

  let finalFirstPlayer = firstPlayer
  function updateFirstPlayer(updating: (player: Player) => Player) {
    finalFirstPlayer = updating(firstPlayer)
  }

  const secondPlayer: Player = $players.get("secondPlayer") as Player

  let finalSecondPlayer = secondPlayer
  function updateSecondPlayer(updating: (player: Player) => Player) {
    finalSecondPlayer = updating(secondPlayer)
  }

  let exchange: Exchange = Exchange.create(
    firstPlayer, secondPlayer)

  function back() {
    players.set(
      Players.setPlayer(
        Players.setPlayer($players, finalFirstPlayer),
        finalSecondPlayer,
      )
    )
    push("/")
  }
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
      inventory={firstPlayer.inventory}
      agree={(offeredItems, updatedInventory) => {
        const { updatedExchange, bothAgreed } =
          Exchange.setFirstAgreed(exchange, true)
        exchange = updatedExchange

        updateFirstPlayer(player =>
          Player.setInventory(player, updatedInventory)
        )
        updateSecondPlayer(player =>
          Player.updateInventory(
            player,
            inventory => Inventory.pushItems(inventory, offeredItems),
          )
        )

        if (bothAgreed) { back() }
      }}
      disagree={() => {
        const { updatedExchange } =
          Exchange.setFirstAgreed(exchange, false)
        exchange = updatedExchange
      }}
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
      inventory={secondPlayer.inventory}
      agree={(offeredItems, updatedInventory) => {
        const { updatedExchange, bothAgreed } =
          Exchange.setSecondAgreed(exchange, true)
        exchange = updatedExchange

        updateSecondPlayer(player =>
          Player.setInventory(player, updatedInventory)
        )
        updateFirstPlayer(player =>
          Player.updateInventory(
            player,
            inventory => Inventory.pushItems(inventory, offeredItems),
          )
        )

        if (bothAgreed) { back() }
      }}
      disagree={() => {
        const { updatedExchange } =
          Exchange.setSecondAgreed(exchange, false)
        exchange = updatedExchange
      }}
    />
  </div>
</div>

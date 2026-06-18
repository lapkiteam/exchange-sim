<script lang="ts">
  import { push } from "svelte-spa-router"
  import { pipeInto } from "ts-functional-pipe"

  import { concat } from "../lib/utils"
  import { Player, type PlayerId } from "../lib/player"
  import { Exchange } from "../lib/exchange"
  import { Players, players } from "../stores/players.svelte"
  import PlayerWindow from "../components/PlayerWindow.svelte"

  export let params: {
    firstPlayerId: PlayerId
    secondPlayerId: PlayerId
  }

  const firstPlayer: Player = $players.get(params.firstPlayerId) as Player
  const secondPlayer: Player = $players.get(params.secondPlayerId) as Player

  let exchange: Exchange = Exchange.create(
    firstPlayer, secondPlayer
  )
  function updateExchange(updating: (exchange: Exchange) => Exchange) {
    exchange = updating(exchange)
  }

  function commit() {
    const exchangeResult = Exchange.commit(exchange)
    players.set(
      pipeInto(
        $players,
        players => Players.setPlayer(
          players,
          Player.setInventory(
            firstPlayer,
            exchangeResult.first,
          ),
        ),
        players => Players.setPlayer(
          players,
          Player.setInventory(
            secondPlayer,
            exchangeResult.second,
          )
        ),
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
      update={(offeredItems, updatedInventory) => {
        updateExchange(exchange =>
          Exchange.setFirst(exchange, offeredItems, updatedInventory)
        )
      }}
      setAgreed={newAgreed => {
        const { updatedExchange, bothAgreed } =
          Exchange.setFirstAgreed(exchange, newAgreed)
        exchange = updatedExchange
        if (bothAgreed) { commit() }
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
      update={(offeredItems, updatedInventory) => {
        updateExchange(exchange =>
          Exchange.setSecond(exchange, offeredItems, updatedInventory)
        )
      }}
      setAgreed={newAgreed => {
        const { updatedExchange, bothAgreed } =
          Exchange.setSecondAgreed(exchange, newAgreed)
        exchange = updatedExchange
        if (bothAgreed) { commit() }
      }}
    />
  </div>
</div>

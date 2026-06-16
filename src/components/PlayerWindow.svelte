<script lang="ts">
  import { concat } from "../lib/utils"
  import type { Item } from "../lib/exchange"
  import { Inventory } from "../lib/inventory"

  export let inventory: Inventory
  export let agreed: () => void
  export let disagreed: () => void

  let offeredItem: Item | undefined = undefined // todo: сделать списком

  function offerItem(itemIndex: number) {
    const newOfferedItem = inventory[itemIndex]
    if (!newOfferedItem) { return }
    if (offeredItem) {
      inventory = Inventory.setItemAt(inventory, offeredItem, itemIndex)
    } else {
      inventory = Inventory.removeItem(inventory, itemIndex)
    }
    offeredItem = newOfferedItem
  }

  function disofferItem() {
    if (!offeredItem) { return }
    inventory = Inventory.pushItem(inventory, offeredItem)
    offeredItem = undefined
  }

  let agreedState = false

  function toggleAgreedState() {
    if (agreedState) { disagreed() } else { agreed() }
    agreedState = !agreedState
  }
</script>

<div>
  <div>
    <h2>Предложение</h2>
    <button on:click={() => {
      disofferItem()
    }}>
      {offeredItem}
    </button>
  </div>
  <div>
    <h2>Инвентарь</h2>
    {#each inventory as item, itemIndex}
      <button on:click={_ => {
        offerItem(itemIndex)
      }}
      >
        {item}
      </button>
    {/each}
  </div>
  <div>
    <button
      class={concat([
        agreedState ? "bg-green-500" : "bg-gray-500"
      ])}
      on:click={_ => {
        toggleAgreedState()
      }}
    >
      Согласиться
    </button>
  </div>
</div>

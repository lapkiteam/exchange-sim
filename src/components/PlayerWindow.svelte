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

<div class={concat([
  "flex",
  "flex-col",
  "h-full",
  "gap-4",
])}>
  <div class={concat([
    "grow"
  ])}>
    <h2 class={concat([
      "text-xl"
    ])}>Предложение</h2>
    {#if offeredItem}
      <button on:click={() => {
        disofferItem()
      }}>
        {offeredItem}
      </button>
    {/if}
  </div>
  <div class={concat([
    "grow"
  ])}>
    <h2 class={concat([
      "text-xl"
    ])}>Инвентарь</h2>
    <ul>
      {#each inventory as item, itemIndex}
        <li>
          <button on:click={_ => {
            offerItem(itemIndex)
          }}
          >
            {item}
          </button>
        </li>
      {/each}
    </ul>
  </div>
  <div class={concat([
    "flex",
    "justify-center",
    "p-2",
  ])}>
    <button
      class={concat([
        agreedState ? "bg-green-500" : "bg-gray-500",
        "p-2",
      ])}
      on:click={_ => {
        toggleAgreedState()
      }}
    >
      Согласиться
    </button>
  </div>
</div>

<script lang="ts">
  import { concat } from "../lib/utils"
  import { type Item } from "../lib/item"
  import { Inventory } from "../lib/inventory"
  import ItemsList from "./ItemsList.svelte"

  export let inventory: Inventory
  export let update: (
    offeredItems: Item[],
    undatedInventory: Inventory,
  ) => void
  export let agree: (
    offeredItems: Item[],
    undatedInventory: Inventory,
  ) => void
  export let disagree: () => void

  let offeredItems: Inventory = []

  function offerItem(itemIndex: number) {
    const newOfferedItem = inventory[itemIndex]
    if (!newOfferedItem) { return }
    inventory = Inventory.removeItem(inventory, itemIndex)
    offeredItems = Inventory.pushItem(offeredItems, newOfferedItem)
    update(inventory, offeredItems)
  }

  function disofferItem(itemIndex: number) {
    const offeredItem = offeredItems[itemIndex]
    if (!offeredItem) { return }
    inventory = Inventory.pushItem(inventory, offeredItem)
    offeredItems = Inventory.removeItem(offeredItems, itemIndex)
  }

  let agreedState = false

  function toggleAgreedState() {
    agreedState = !agreedState
    if (agreedState) {
      agree(offeredItems, inventory)
    } else {
      disagree()
    }
  }
</script>

<div class={concat([
  "flex",
  "flex-col",
  "size-full",
  "gap-3",
  "overflow-y-auto",
])}>
  <div class={concat([
    "flex",
    "size-full",
    "overflow-y-auto",
    "gap-4",
  ])}>
    <ItemsList
      title="Инвентарь"
      items={inventory}
      onClick={offerItem}
    />
    <ItemsList
      title="Предложение"
      items={offeredItems}
      onClick={disofferItem}
    />
  </div>
  <div class={concat([
    "flex",
    "justify-center",
  ])}>
    <button
      class={concat([
        agreedState ? "bg-green-500" : "bg-gray-500",
        "p-2",
        "size-fit",
      ])}
      on:click={_ => {
        toggleAgreedState()
      }}
    >
      Согласиться
    </button>
  </div>
</div>

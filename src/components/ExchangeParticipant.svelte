<script lang="ts">
  import { concat } from "../lib/utils"
  import { type Item } from "../lib/item"
  import { Inventory } from "../lib/inventory"
  import ItemsList from "./ItemsList.svelte"
  import ItemView from "./Item.svelte"

  export let inventory: Inventory
  export let agreed = false
  export let name: string | undefined = undefined
  export let update: (
    offeredItems: Item[],
    undatedInventory: Inventory,
  ) => void
  export let setAgreed: (agreed: boolean) => void

  let offeredItems: Inventory = []

  function offerItem(itemIndex: number) {
    const newOfferedItem = inventory[itemIndex]
    if (!newOfferedItem) { return }
    inventory = Inventory.removeItem(inventory, itemIndex)
    offeredItems = Inventory.pushItem(offeredItems, newOfferedItem)
    update(offeredItems, inventory)
  }

  function disofferItem(itemIndex: number) {
    const offeredItem = offeredItems[itemIndex]
    if (!offeredItem) { return }
    inventory = Inventory.pushItem(inventory, offeredItem)
    offeredItems = Inventory.removeItem(offeredItems, itemIndex)
    update(offeredItems, inventory)
  }

  function toggleAgreedState() {
    agreed = !agreed
    setAgreed(agreed)
  }
</script>

<div class={concat([
  "flex",
  "flex-col",
  "size-full",
  "gap-1",
  "overflow-y-auto",
])}>
  {#if name}
    <h1 class={concat([
      "text-2xl",
      "text-center",
    ])}>{name}</h1>
  {/if}
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
      let:item
    >
      <ItemView item={item} />
    </ItemsList>
    <ItemsList
      title="Предложение"
      items={offeredItems}
      onClick={disofferItem}
      let:item
    >
      <ItemView item={item} />
    </ItemsList>
  </div>
  <div class={concat([
    "flex",
    "justify-center",
  ])}>
    <button
      class={concat([
        agreed ? "bg-green-500" : "bg-gray-500",
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

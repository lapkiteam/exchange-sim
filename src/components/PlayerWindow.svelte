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
    <div class={concat([
      "grow",
      "size-full",
      "overflow-y-auto",
      "flex",
      "flex-col",
      "gap-1",
    ])}>
      <h2 class={concat([
        "text-xl",
      ])}>Инвентарь</h2>
      <ul class={concat([
        "pl-1",
        "overflow-y-auto",
      ])}>
        {#each inventory as item, itemIndex}
          <li>
            <button on:click={_ => {
              offerItem(itemIndex)
            }}
            >
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
            </button>
          </li>
        {/each}
      </ul>
    </div>
    <div class={concat([
      "grow",
      "size-full",
      "overflow-y-auto",
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

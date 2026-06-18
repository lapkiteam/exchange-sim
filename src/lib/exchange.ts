import update from "immutability-helper"

import { type Item } from "./item"
import { type Player } from "./player"
import { Inventory } from "./inventory"

export type Offer = Item[]

export type ExchangeParticipant = {
  Offer: Offer
  Agreed: boolean
  Inventory: Inventory
}

export namespace ExchangeParticipant {
  export function setAgreed(
    participant: ExchangeParticipant,
    newAgreed: ExchangeParticipant["Agreed"],
  ): ExchangeParticipant {
    return update(participant, {
      Agreed: {
        $set: newAgreed
      }
    })
  }

  export function disagreed(
    participant: ExchangeParticipant,
  ): ExchangeParticipant {
    return setAgreed(participant, false)
  }
}

export type Exchange = {
  FirstParticipant: ExchangeParticipant
  SecondParticipant: ExchangeParticipant
}

export namespace Exchange {
  export function create(p1: Player, p2: Player): Exchange {
    return {
      FirstParticipant: {
        Offer: [],
        Agreed: false,
        Inventory: p1.inventory,
      },
      SecondParticipant: {
        Offer: [],
        Agreed: false,
        Inventory: p2.inventory,
      },
    }
  }

  export function setFirst(
    exchange: Exchange,
    newOffer: Offer,
    newInventory: Inventory,
  ): Exchange {
    // todo: не обновлять, если новое предложение равно старому
    return update(exchange, {
      FirstParticipant: {
        Offer: {
          $set: newOffer,
        },
        Inventory: {
          $set: newInventory,
        },
      },
      SecondParticipant: {
        $apply: ExchangeParticipant.disagreed
      }
    })
  }

  export function setFirstAgreed(
    exchange: Exchange,
    newAgreed: ExchangeParticipant["Agreed"],
  ) {
    const updatedExchange = update(exchange, {
      FirstParticipant: {
        $apply: part =>
          ExchangeParticipant.setAgreed(part, newAgreed),
      }
    })
    const bothAgreed = newAgreed && exchange.SecondParticipant.Agreed
    return {
      updatedExchange,
      bothAgreed,
    }
  }

  export function setSecond(
    exchange: Exchange,
    newOffer: Offer,
    newInventory: Inventory,
  ): Exchange {
    // todo: не обновлять, если новое предложение равно старому
    return update(exchange, {
      FirstParticipant: {
        $apply: ExchangeParticipant.disagreed
      },
      SecondParticipant: {
        Offer: {
          $set: newOffer,
        },
        Inventory: {
          $set: newInventory,
        },
      }
    })
  }

  export function setSecondAgreed(
    exchange: Exchange,
    newAgreed: ExchangeParticipant["Agreed"],
  ) {
    const updatedExchange = update(exchange, {
      SecondParticipant: {
        $apply: part =>
          ExchangeParticipant.setAgreed(part, newAgreed),
      }
    })
    const bothAgreed = newAgreed && exchange.FirstParticipant.Agreed
    return {
      updatedExchange,
      bothAgreed,
    }
  }

  export function commit(
    exchange: Exchange
  ): { first: Inventory, second: Inventory } {
    return {
      first: Inventory.pushItems(
        exchange.FirstParticipant.Inventory,
        exchange.SecondParticipant.Offer,
      ),
      second: Inventory.pushItems(
        exchange.SecondParticipant.Inventory,
        exchange.FirstParticipant.Offer,
      ),
    }
  }
}

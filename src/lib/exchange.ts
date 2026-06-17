import update from "immutability-helper"

import { type Item } from "./item"
import { type Player } from "./player"

export type Offer = Item[]

export type ExchangeParticipant = {
  Offer: Offer
  Agreed: boolean
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
      },
      SecondParticipant: {
        Offer: [],
        Agreed: false,
      },
    }
  }

  export function setFirstOffer(
    exchange: Exchange,
    newOffer: Offer,
  ): Exchange {
    // todo: не обновлять, если новое предложение равно старому
    return update(exchange, {
      FirstParticipant: {
        Offer: {
          $set: newOffer
        }
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

  export function setSecondOffer(
    exchange: Exchange,
    newOffer: Offer,
  ): Exchange {
    // todo: не обновлять, если новое предложение равно старому
    return update(exchange, {
      FirstParticipant: {
        $apply: ExchangeParticipant.disagreed
      },
      SecondParticipant: {
        Offer: {
          $set: newOffer
        }
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
}

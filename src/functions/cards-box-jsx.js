import React from 'react'
import CardsBox from '../components/cards/cards-box'
import Messages from '../components/messages'

export const cardsJSX = (data, mode, msg, callback, selectCards, result) => {
  if (data[0] !== "ERROR") {
    if (data.length > 0) {
      result = data.map(
        element => (
          <CardsBox
            key = {element.cards_id}
            cards = {element}
            mode = {mode}
            callback = {callback}
            selectCards = {selectCards}
          />
        )
      )
    } else {
      result = <Messages caption={`message_${msg}None`} />
    }
  } else {
    result = <Messages caption={`message_${msg}Error`} />
  }
  return result
}
import React from 'react'
import ConsultationCard from '../consultation-card'
import { PromisePool } from 'mysql2/promise'

function CardsThisSession({session_id, thisSessionCards, thisSessionCardsLocal, socket}) {
  let cards = {}
  let dataJSX = []
  
  if (thisSessionCards !== undefined) {
    cards = {...thisSessionCards}
  } else if (thisSessionCardsLocal !== undefined) {
    cards = {...thisSessionCardsLocal}
  }

  // console.log('render this cards fetched')

  for (const key in cards) {
    if (cards.hasOwnProperty(key)) {
      const element = cards[key]
        dataJSX.push(
          <ConsultationCard
            key={`exist-card-${key}`}
            style_1={{}}
            card={element.card}
            position_left={element.position_left}
            position_top={element.position_top}
            scale={element.scale}
            exist_card={true}
            session_id={session_id}
            socket={socket}
          />
        )
    }
  }

  return (
    <div className="consultation-cards-exists">
      {dataJSX}
    </div>
  )
}

export default CardsThisSession
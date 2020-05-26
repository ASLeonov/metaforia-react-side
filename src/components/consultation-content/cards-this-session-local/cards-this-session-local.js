import React from 'react'
import ConsultationCard from '../consultation-card'

function CardsThisSessionLocal({session_id, thisSessionCardsLocal}) {

  // console.log('render local cards')

  const dataJSX = []

  for (const key in thisSessionCardsLocal) {
    if (thisSessionCardsLocal.hasOwnProperty(key)) {
      const element = thisSessionCardsLocal[key]
        dataJSX.push(
          <ConsultationCard
            key={`exist-card-local-${key}`}
            style_1={{}}
            card={element.card}
            position_left={element.position_left}
            position_top={element.position_top}
            scale={element.scale}
            exist_card_local={true}
            session_id={session_id}
          />
        )
    }
  }

  return (
    <>{dataJSX}</>
  )

}

export default CardsThisSessionLocal
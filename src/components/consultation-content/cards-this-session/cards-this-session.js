import React from 'react'
import ConsultationCard from '../consultation-card'

function CardsThisSession({session_id, thisSessionCards}) {

  // console.log('render this cards fetched')

  const dataJSX = []

  for (const key in thisSessionCards) {
    if (thisSessionCards.hasOwnProperty(key)) {
      const element = thisSessionCards[key]
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
          />
        )
    }
  }

  return (
    <>{dataJSX}</>
  )
}

export default CardsThisSession
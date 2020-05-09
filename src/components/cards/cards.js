import React from 'react'
import CardsCaption from './cards-caption'
import CardsBody from './cards-body'
import './cards.css'

function Cards(props) {

  // console.log('render Cards')

  return (
    <div className="content-cards">
      <CardsCaption />
      <CardsBody activeCardsTab={props.activeCardsTab} />
    </div>
  )

}

export default Cards
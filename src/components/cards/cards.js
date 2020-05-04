import React from 'react'
import {useState} from 'react'
import CardsCaption from './cards-caption'
import CardsBody from './cards-body'
import './cards.css'

function Cards() {

  const [activeCardsTab, setActiveCardsTab] = useState('freeCards')

  const changeActiveCards = newCardsTab => {
    setActiveCardsTab(newCardsTab)
  }

  return (
      <div className="content-cards">
        <CardsCaption
          activeCardsTab={activeCardsTab}
          changeActiveCards={changeActiveCards}
        />
        <CardsBody
          activeCardsTab={activeCardsTab}
          changeActiveCards={changeActiveCards}
        />
      </div>
  )
  
}

export default Cards
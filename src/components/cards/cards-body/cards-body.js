import React from 'react'
import FreeCards from './free-cards'
import PayCards from './pay-cards'
import ClientCards from './client-cards'
import './cards-body.css'

function CardsBody(props) {
  let currentData = ''

  switch (props.activeCardsTab) {
    case 'freeCards':
      currentData = <FreeCards />
      break;
    case 'payCards':
      currentData = <PayCards />
      break;
    case 'clientCards':
      currentData = <ClientCards />
      break;
    default:
      currentData = <FreeCards />
      break;
  }

  return (
    <div className="content-cards-body">
      {currentData}
    </div>
  )
}

export default CardsBody
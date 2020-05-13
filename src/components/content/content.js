import React from 'react'
import Sessions from '../sessions'
import Cards from '../cards'
import Contacts from '../contacts'
import Consultation from '../consultation'
// import img from '../../images/cards/cards-1/card-1.png'
import './content.css'

function Content(props) {

  let activeData = ''
    switch (props.activePage) {
      case 'sessions':
        activeData = <Sessions activeSessionsTab={props.activeTab} />
        break;
      case 'cards':
        activeData = <Cards activeCardsTab={props.activeTab} />
        break;
      case 'contacts':
        activeData = <Contacts activeContactsTab={props.activeTab} />
        break;
      case 'consultation':
        activeData = <Consultation />
        break;
      default:
        activeData = <Sessions activeSessionsTab="currentSessions" />
        break;
    }

  return (
      <div className="content">
        {activeData}
        {/* <img src={img} className="App-logo" alt="logo" /> */}
      </div>
  )
}

export default Content
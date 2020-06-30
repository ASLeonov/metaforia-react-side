import React from 'react'
import Sessions from '../sessions'
import Cards from '../cards'
import Contacts from '../contacts'
import Consultation from '../consultation'
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

  console.log('render Content')

  return (
      <div className="content">
        {activeData}
      </div>
  )
}

export default Content
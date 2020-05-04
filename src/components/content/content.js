import React from 'react'
import Sessions from '../sessions'
import Cards from '../cards'
import Contacts from '../contacts'
// import img from '../../images/cards/cards-1/card-1.png'
import './content.css'

function Content(props) {

  const {activePage} = props

  let activeData = ''
    switch (activePage) {
      case 'sessions':
        activeData = <Sessions />
        break;
      case 'cards':
        activeData = <Cards />
        break;
      case 'contacts':
        activeData = <Contacts />
        break;
      default:
        activeData = <Sessions />
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
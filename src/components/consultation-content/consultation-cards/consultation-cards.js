import React, {useState} from 'react'
import {connect} from 'react-redux'
import {selectUserSelectedCards} from '../../../store/selectors/cards'
import {getSelectedCardItems} from '../../../store/action-creators'
import Loader from '../../loader'
import './consultation-cards.css'

function ConsultationCards(props) {
  const [xPosition, setXPosition] = useState(0)
  const {isLoaded, isLoading, data} = props.userSelectedCards
  let fetched

  const rightScrollClick = () => {
    const wrapper_element = document.querySelector('.consultation-cards-center-wrapper')
    if (wrapper_element.scrollWidth > wrapper_element.clientWidth) {
      setXPosition(xPosition + 1)
    }
  }

  const leftScrollClick = () => {
    (xPosition > 0) && setXPosition(xPosition - 1)
  }

  if (!isLoaded && !isLoading) {
    props.getSelectedCards(props.cards_id)
  }

  if (isLoading) {
    fetched = <Loader />
  } else if (isLoaded) {
    if (data[0] !== "ERROR") {
      if (data.length > 0) {
        let i = 0
        fetched = data.map(
          element => {
            i++
            const style = {width:'0', margin:'0'}
            return (
              <img
                key={element.cards_id}
                src={`../images/cards-item/${element.cards_img}`}
                className="consultation-card"
                alt={`Карта «${element.cards_name}»`}
                title={`Карта «${element.cards_name}»`}
                style={i <= xPosition ? style : null}
              />
            )
          } 
        )
      } else {
        // fetched = <Messages caption="message_freeCardsNone" />
      }
    } else {
      // fetched = <Messages caption="message_freeCardsError" />
    }
  }

  return (
    <div className="consultation-cards">
      <div className="consultation-cards-leftBtn" onClick={leftScrollClick}></div>
      <div className="consultation-cards-center">
        <div className="consultation-cards-center-wrapper">
          {fetched}
        </div>
      </div>
        <div className="consultation-cards-rightBtn" onClick={rightScrollClick}></div>
    </div>
  )
}

export default connect(
  state => {
    return {
      userSelectedCards: selectUserSelectedCards(state)
    }
  },
  {
    getSelectedCards: getSelectedCardItems
  }
)(ConsultationCards)
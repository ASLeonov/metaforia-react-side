import React, {useState} from 'react'
import {connect} from 'react-redux'
import {selectUserCards} from '../../store/selectors/cards'
import {getUserCards} from '../../store/action-creators'
import CardsBox from '../cards/cards-box'
import ConsultationCards from './consultation-cards'
import Messages from '../messages'
import Loader from '../loader'
import './consultation-content.css'

function ConsultationContent(props) {
  const [selectCards, setSelectCards] = useState(null)
  const {isLoaded, isLoading, data} = props.userCards

  let fetched

  const onSelectCardsClick = cardsBox_id => {
    setSelectCards(cardsBox_id)
  }

  const userCardsJSX = (data, result) => {
    if (data.length > 0) {
      result = data.map(
        element => (
          <CardsBox
            key={element.cards_id}
            cards={element}
            mode="consult_mode"
            callback={onSelectCardsClick}
          />
        )
      )
    } else {
      result = <Messages caption="message_freeCardsNone" />
    }
    return result
  }

  if (!isLoaded && !isLoading) {
    props.getUserCards()
  }

  if (isLoading) {
    fetched = <Loader />
  } else if (isLoaded) {
    if (data[0] !== "ERROR") {
      if (data.length > 0) {
        fetched = userCardsJSX(data)
      } else {
        fetched = <Messages caption="message_freeCardsNone" />
      }
    } else {
      fetched = <Messages caption="message_freeCardsError" />
    }
  }

  return (
    <>
      <div className="consultation-field">
        <div className={selectCards ? "consultation-set-cards__none" : "consultation-set-cards"}>
          {fetched}
        </div>
      </div>
      {selectCards ? <ConsultationCards cards_id={selectCards}/> : ''}
    </>
  )
}

export default connect(
  state => {
    return {
      userCards: selectUserCards(state)
    }
  },
  {
    getUserCards: getUserCards
  }
)(ConsultationContent)
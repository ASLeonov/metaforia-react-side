import React from 'react'
import {connect} from 'react-redux'
import {getUserCards} from '../../../../store/action-creators'
import {selectUserCards, selectUserCardsJSX} from '../../../../store/selectors/cards'
import Messages from '../../../messages'
import Loader from '../../../loader'
import './free-cards.css'

function FreeCards(props) {
  const {cards_data, cardsJSX, getUserCards} = props
  let fetched

  if (!cards_data.isLoading && !cards_data.isLoaded) {
    getUserCards()
  }

  if (cards_data.isLoading) {
    fetched = <Loader />
  }

  if (cards_data.isLoaded) {
    if (cards_data.data[0] !== "ERROR") {
      if (cards_data.data.length > 0) {
        fetched = cardsJSX
      } else {
        fetched = <Messages caption="message_freeCardsNone" />
      }
    } else {
      fetched = <Messages caption="message_freeCardsError" />
    }
  }

  return (
    <div className="content-cards-body-freeCards">
      {fetched}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    cards_data: selectUserCards(state),
    cardsJSX: selectUserCardsJSX(state)
  }
}

const mapDispatchToProps = {
  getUserCards: getUserCards
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FreeCards)
import React from 'react'
import {connect} from 'react-redux'
import {getFreeCards} from '../../../../store/action-creators'
import {selectFreeCards, selectFreeCardsJSX} from '../../../../store/selectors/cards'
import Messages from '../../../messages'
import Loader from '../../../loader'
import './free-cards.css'

function FreeCards(props) {
  const {cards_data, cardsJSX, getFreeCards} = props
  let fetched

  if (!cards_data.isLoaded) {
    fetched = <Loader />
    getFreeCards()
  } else if (cards_data.data[0] !== "ERROR") {
    fetched = cardsJSX
  } else {
    fetched = <Messages caption="message_freeCardsError" />
  }

  return (
    <div className="content-cards-body-freeCards">
      {fetched}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    cards_data: selectFreeCards(state),
    cardsJSX: selectFreeCardsJSX(state)
  }
}

const mapDispatchToProps = {
  getFreeCards: getFreeCards
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FreeCards)
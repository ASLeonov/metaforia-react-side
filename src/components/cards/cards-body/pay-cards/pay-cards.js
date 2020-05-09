import React from 'react'
import {connect} from 'react-redux'
import {getPayCards} from '../../../../store/action-creators'
import {selectPayCards, selectPayCardsJSX} from '../../../../store/selectors/cards'
import Messages from '../../../messages'
import Loader from '../../../loader'

function PayCards(props) {
  const {cards_data, cardsJSX, getPayCards} = props
  let fetched

  if (!cards_data.isLoaded) {
    fetched = <Loader />
    getPayCards()
  } else if (cards_data.data[0] !== "ERROR") {
    fetched = cardsJSX
  } else {
    fetched = <Messages caption="message_payCardsError" />
  }

  return (
    <div className="content-cards-body-freeCards">
      {fetched}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    cards_data: selectPayCards(state),
    cardsJSX: selectPayCardsJSX(state)
  }
}

const mapDispatchToProps = {
  getPayCards: getPayCards
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PayCards)
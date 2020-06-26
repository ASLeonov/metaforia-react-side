import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {getPayCards} from '../../../../store/action-creators/cards-actions'
import {selectPayCards} from '../../../../store/selectors/cards'
import {cardsJSX} from '../../../../functions/cards-box-jsx'
import Loader from '../../../loader'

function PayCards(props) {
  const {cards_data, getPayCards} = props
  let fetched

  const onCardsClick = () => console.log('Будет описание карт... Pay cards')

  if (cards_data.isLoading) {
    fetched = <Loader />
  }

  if (cards_data.isLoaded) {
    fetched = cardsJSX(cards_data.data, 'cards-page', 'payCards', onCardsClick)
  }

  useEffect( () => {
    if (!cards_data.isLoading && !cards_data.isLoaded) {
      getPayCards()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="content-cards-body-freeCards">
      {fetched}
    </div>
  )
}

export default connect(
  state => ({
    cards_data: selectPayCards(state),
  }),
  {
    getPayCards
  }
)(PayCards)
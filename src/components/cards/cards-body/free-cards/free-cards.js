import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {getUserCards} from '../../../../store/action-creators/cards-actions'
import {selectUserCards} from '../../../../store/selectors/cards'
import {cardsJSX} from '../../../../functions/cards-box-jsx'
import Loader from '../../../loader'
import './free-cards.css'

function FreeCards(props) {
  const {cards_data, getUserCards} = props
  let fetched

  const onCardsClick = () => console.log('Будет описание карт... Free cards')

  if (cards_data.isLoading) {
    fetched = <Loader />
  }

  if (cards_data.isLoaded) {
    fetched = cardsJSX(cards_data.data, 'cards-page', 'freeCards', onCardsClick)
  }

  useEffect( () => {
    if (!cards_data.isLoading && !cards_data.isLoaded) {
      getUserCards()
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
    cards_data: selectUserCards(state)
  }),
  {
    getUserCards
  }
)(FreeCards)

// ...

// Корректная работа:
// После первого рендера срабатывает useEffect и при необходимости фетчим данные с сервера.
// Фетч один, все нормально.
// Если данные уже загружены ранее, то проверяем установлен ли ранее активный клиент (к-й выделен в <ContactsList /> и отображается в <ContactItem />) - если он выбран ранее, от это значение из state этого компонента, в противном случае берем первую запись по клиентам из store (редюсер contacts).
// Количество рендеров соответствует количеству обновлений store и state (4 при монтировании с фетчем данных).
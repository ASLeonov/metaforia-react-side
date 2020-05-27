import React from 'react'
import {connect} from 'react-redux'
import {getSelectedCardItems} from '../../../store/action-creators/cards-actions'
import './cards-box.css'

function CardsBox(props) {
  const {cards, mode, callback, getSelectedCardItems} = props

  const selectCardsBox = () => {
    switch (mode) {
      case 'consult-mode-enter':
        getSelectedCardItems(cards.cards_id)
        callback(cards.cards_id)
        break
      case 'consult-mode-play':
        callback(cards.cards_id)
        break
      default:
        break
    }
  }

  console.log('render CardBox', mode)

  return(
    <div className="cardsBox-item" key={cards.cards_id} onClick={selectCardsBox}>
      <img
        src={`../images/cards-pack/${cards.cards_img}`}
        className="cardsBox-item-img"
        alt={`Колода «${cards.cards_name}»`}
        title={`Колода «${cards.cards_name}»`}
      />
      <span><b>{cards.cards_name}</b></span>
      <span>Автор: <b>{cards.cards_author}</b></span>
      {/* <span>Стоимость: <b>{cards.cards_pay}₽/месяц</b></span> */}
      {cards.cards_end_date ? <span>Оплачено до: <b>{cards.cards_end_date}</b></span> : 'Бесплатная колода'}
    </div>
  )
}

export default connect(
  () => ({}),
  {
    getSelectedCardItems,
  }
)(CardsBox)

// Есть два пути, когда можно зафетчить карты из выбранной колоды.
// Первый - в компоненте consultation-cards (этот функционал в нем сейчас реализован).
// Второй - здесь при выборе колоды на этапе начальной загрузки сессии (mode:"consult-mode-enter"). Сейчас этот вариант работает по умолчанию. Лишних рендеров и фетчей не наблюдаю - все ok.
// Какой вариант лучше? Не знаю. Есть везде свои за и против. Надо тестить в продакшн, если будет корректно работать, не рендерить лишний раз компоненты и не делать дублирующих фетчей, то оставляем так.
// Отключить фетч здесь и переключиться на фетч через компонент consultation-cards - просто снести здесь getSelectedCardItems(cards.cards_id). Единственное, будет лезть мой любимый баг, лечащийся setTimeout в action-creator.
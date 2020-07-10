import React from 'react'
import {connect} from 'react-redux'
import {getSelectedCardItems, getCardsThisSession, addSelectedCardItems} from '../../../store/action-creators/cards-actions'
import './cards-box.css'

function CardsBox(props) {
  const {cards, mode, callback, selectCards, getSelectedCardItems, getCardsThisSession, addSelectedCardItems} = props

  const selectCardsBox = () => {
    switch (mode) {
      case 'consult-mode-enter':
        getSelectedCardItems(cards.cards_id)
        // setCardsThisSession(cards.cards_id)
        getCardsThisSession()
        callback(cards.cards_id)
        break
      case 'consult-mode-play':
        if (selectCards !== cards.cards_id) {
          addSelectedCardItems(cards.cards_id)
          callback(cards.cards_id)
        }
        break
      case 'cards-page':
        callback()
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
  null,
  {
    getSelectedCardItems, getCardsThisSession, 
    addSelectedCardItems
  }
)(CardsBox)

// Есть два пути, когда можно зафетчить карты из выбранной колоды и имеющиеся карты сессии.
// Первый - в компоненте consultation-cards (этот функционал в нем сейчас реализован и частично работает рпи подгрузке во время консультации).
// Второй - здесь при выборе колоды на этапе начальной загрузки сессии (mode:"consult-mode-enter"). Сейчас этот вариант работает по умолчанию. Лишних рендеров и фетчей не наблюдаю - все ok. Этот вариант экономит лишний рендер, т.к. getSelectedCardItems и getCardsThisSession вызваны рядом в одном месте и получается как бы вызывают одно изменение стора.
// Отключить фетч здесь и переключиться на фетч через компонент consultation-cards - просто снести здесь getSelectedCardItems(cards.cards_id) и getCardsThisSession().
// Подгрузка доп. колод во время сессии происходит в <ConsultationCards />.
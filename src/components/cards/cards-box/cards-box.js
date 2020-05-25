import React from 'react'
import {connect} from 'react-redux'
import {clearCardsThisSession, clearCardThisSessionLocal} from '../../../store/action-creators/cards-actions'
import './cards-box.css'

function CardsBox(props) {
  const {cards, mode, callback} = props

  const selectCardsBox = () => {
    switch (mode) {
      case 'consult-mode-enter':
        callback(cards.cards_id)
        break
      case 'consult-mode-play':
        props.clearCardsThisSession()
        props.clearCardThisSessionLocal()
        // clearSelectedCardItems()  пока решил не сносить state скачанных карт из колод
        // props.hideMenu()
        callback(cards.cards_id)
        break
      default:
        break
    }
    
  }

  return(
    <div
      className="cardsBox-item"
      key={cards.cards_id}
      onClick={selectCardsBox}
    >
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
    clearCardsThisSession: clearCardsThisSession,
    clearCardThisSessionLocal: clearCardThisSessionLocal
  }
)(CardsBox)
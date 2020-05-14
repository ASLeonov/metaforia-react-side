import React from 'react'
import './cards-box.css'

function CardsBox(props) {
  const {cards, mode, callback} = props

  const selectCardsBox = () => {
    callback(cards.cards_id)
  }

  return(
    <div className="cardsBox-item" key={cards.cards_id} onClick={mode === "consult_mode" ? selectCardsBox : selectCardsBox}>
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

export default CardsBox
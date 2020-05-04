import React from 'react'
import './pay-cards.css'
import {payCards} from '../../../../fixtures/paycards'

function PayCards() {

  const cards_list = []

  const userHardCode = "tanyaleo81@yandex.ru"

  const cards_for_user = payCards[userHardCode]

  if (cards_for_user) {
    for (const key in cards_for_user) {
      cards_list.push(
        <div className="freeCards-item" key={cards_for_user[key].cards_id}>
          <img
            src={cards_for_user[key].cards_img}
            className="freeCards-item-img"
          />
          <span><b>{cards_for_user[key].cards_name}</b></span>
          <span>Автор: <b>{cards_for_user[key].cards_author}</b></span>
          <span>Стоимость: <b>{cards_for_user[key].cards_pay}</b></span>
        </div>
      )
    }
  } else {
    cards_list.push(
      <p key='no_paycards'>
        Наборов карт нету у тебя, о подован.
      </p>
    )
  }

  return (
      <div className="content-cards-body-freeCards">
        {cards_list}
      </div>
  )
}

export default PayCards
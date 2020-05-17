import React from 'react'
import {createSelector} from 'reselect'
import Messages from '../../components/messages'

export const selectUserCards = state => state.userCards
export const selectPayCards = state => state.payCards
export const selectUserSelectedCards = state => state.userSelectedCards
export const selectThisSessionCards = state => state.cardsThisSession

export const selectUserCardsJSX = createSelector(
  selectUserCards,
  (userCards, result) => {
      if (userCards.data.length > 0) {
        result = userCards.data.map(
          element => (
            <div className="freeCards-item" key={element.cards_id}>
              <img
                src={`../images/cards-pack/${element.cards_img}`}
                className="freeCards-item-img"
                alt={`Колода «${element.cards_name}»`}
                title={`Колода «${element.cards_name}»`}
              />
              <span><b>{element.cards_name}</b></span>
              <span>Автор: <b>{element.cards_author}</b></span>
              {/* <span>Стоимость: <b>{element.cards_pay}₽/месяц</b></span> */}
              {element.cards_end_date ? <span>Оплачено до: <b>{element.cards_end_date}</b></span> : 'Бесплатная колода'}
            </div>
          )
        )
      } else {
        result = <Messages caption="message_freeCardsNone" />
      }
    return result
  }
)

export const selectPayCardsJSX = createSelector(
  selectPayCards,
  (payCards, result) => {
    // console.log('current sessions input ->',currentSessions.data, currentSessions.data.length)
      if (payCards.data.length > 0) {
        result = payCards.data.map(
          element => (
            <div className="freeCards-item" key={element.cards_id}>
              <img
                src={`../images/cards-pack/${element.cards_img}`}
                className="freeCards-item-img"
                alt={`Колода «${element.cards_name}», стоимость ${element.cards_pay}₽/месяц`}
                title={`Колода «${element.cards_name}», стоимость ${element.cards_pay}₽/месяц`}
              />
              <span><b>{element.cards_name}</b></span>
              <span>Автор: <b>{element.cards_author}</b></span>
              <span>Стоимость: <b>{element.cards_pay}₽/месяц</b></span>
            </div>
          )
        )
      } else {
        result = <Messages caption="message_payCardsNone" />
      }
    // console.log('current sessions result ->',result)
    return result
  }
)
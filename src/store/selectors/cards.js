import React from 'react'
import {createSelector} from 'reselect'
import Messages from '../../components/messages'

export const selectFreeCards = state => state.freeCards
export const selectPayCards = state => state.payCards

export const selectFreeCardsJSX = createSelector(
  selectFreeCards,
  (freeCards, result) => {
    // console.log('current sessions input ->',currentSessions.data, currentSessions.data.length)
      if (freeCards.data.length > 0) {
        result = freeCards.data.map(
          element => (
            <div className="freeCards-item" key={element.freecards_id}>
              <img
                src={`../images/cards-pack/${element.freecards_img}`}
                className="freeCards-item-img"
                alt={`Колода «${element.freecards_name}»`}
                title={`Колода «${element.freecards_name}»`}
              />
              <span><b>{element.freecards_name}</b></span>
              <span>Автор: <b>{element.freecards_author}</b></span>
            </div>
          )
        )
      } else {
        result = <Messages caption="message_freeCardsNone" />
      }
    // console.log('current sessions result ->',result)
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

// export const selectLastSessionsJSX = createSelector(
//   selectLastSessions,
//   (lastSessions, result) => {
//     // console.log('last sessions input ->',lastSessions.data, lastSessions.data.length)
//       if (lastSessions.data.length > 0) {
//         result = lastSessions.data.map(element => (
//           <div className="sessions-item" key={element.session_id}>
//             <div className="sessions-item-caption">
//               <span className="sessions-item-caption__1stelement">
//                 {element.session_date}
//               </span>
//               <span className="sessions-item-caption__2ndelement">
//                 {`${element.client_name} ${element.client_surname}`} 
//               </span>
//             </div>
//             <div className="sessions-item-body">
//               {element.session_descr}
//             </div>
//           </div>
//           )
//         )
//       } else {
//         result = <Messages caption="message_lastSessionsNone" />
//       }
//     // console.log('last sessions result ->',result)
//     return result
//   }
// )
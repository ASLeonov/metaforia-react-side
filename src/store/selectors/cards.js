export const selectUserCards = state => state.userCards
export const selectPayCards = state => state.payCards
export const selectUserSelectedCards = state => state.userSelectedCards
export const selectThisSessionCards = state => state.thisSession.cardsThisSession
export const selectThisSessionCardsLocal = state => state.thisSession.cardsThisSessionLocal

// export const selectPayCardsJSX = createSelector(
//   selectPayCards,
//   (payCards, result) => {
//       if (payCards.data.length > 0) {
//         result = payCards.data.map(
//           element => (
//             <div className="cardsBox-item" key={element.cards_id}>
//               <img
//                 src={`../images/cards-pack/${element.cards_img}`}
//                 className="cardsBox-item-img"
//                 alt={`Колода «${element.cards_name}», стоимость ${element.cards_pay}₽/месяц`}
//                 title={`Колода «${element.cards_name}», стоимость ${element.cards_pay}₽/месяц`}
//               />
//               <span><b>{element.cards_name}</b></span>
//               <span>Автор: <b>{element.cards_author}</b></span>
//               <span>Стоимость: <b>{element.cards_pay}₽/месяц</b></span>
//             </div>
//           )
//         )
//       } else {
//         result = <Messages caption="message_payCardsNone" />
//       }
//     return result
//   }
// )
import React from 'react'
import {useState, useEffect} from 'react'
// import './pay-cards.css'

function PayCards() {

  const [fetched, setFetched] = useState([])

  const userHardCode = "tanyaleo81@yandex.ru"
  const cards_list = []

  useEffect( () => {
    fetch(`http://localhost/ll/cards.php?name=${userHardCode}&type=payCards`)
      .then(res => res.json())
      .then(res => {
        if (fetched.length === 0) {
          res.forEach(element => {
            cards_list.push(
              <div className="freeCards-item" key={element.cards_id}>
                <img
                  src={`./images/${element.cards_img}`}
                  className="freeCards-item-img"
                />
                <span><b>{element.cards_name}</b></span>
                <span>Автор: <b>{element.cards_author}</b></span>
                <span>Стоимость: <b>{element.cards_pay}₽/месяц</b></span>
              </div>
            )
          })
          console.log('cards list ->', cards_list)
          setFetched(cards_list)
        }
      })
      .catch(err => console.log('error', err))
  })

  //   cards_list.push(
  //     <p key='no_paycards'>
  //       Наборов карт нету у тебя, о подован.
  //     </p>
  //   )
  // }

  return (
      <div className="content-cards-body-freeCards">
        {fetched}
      </div>
  )
}

export default PayCards
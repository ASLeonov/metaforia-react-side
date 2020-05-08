import React from 'react'
import {useState, useEffect} from 'react'
import Messages from '../../../messages'
import {api_path} from '../../../../settings'

function PayCards() {

  const [fetched, setFetched] = useState([])

  const userHardCode = "tanyaleo81@yandex.ru"
  const cards_list = []

  useEffect( () => {
    if (fetched.length > 0) return
    fetch(`${api_path}cards.php?name=${userHardCode}&type=payCards`)
      .then(res => res.json())
      .then(res => {
        if (fetched.length === 0) {
          res.forEach(element => {
            cards_list.push(
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
          })
          // console.log('cards list ->', cards_list)
          setFetched(cards_list)
        }
      })
      .catch(err => 
        setFetched([<Messages caption="message_payCardsError" key="pay-cards" err={err} />]))
  })

  return (
    <div className="content-cards-body-freeCards">
      {fetched}
    </div>
  )
}

export default PayCards
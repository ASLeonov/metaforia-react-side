import React from 'react'
import {useState, useEffect} from 'react'
import CardsMessages from '../../cards-messages'
import {api_path} from '../../../../settings'
import './free-cards.css'

function FreeCards() {

  const [fetched, setFetched] = useState([])

  const userHardCode = "tanyaleo81@yandex.ru"
  const cards_list = []

  useEffect( () => {
    if (fetched.length > 0) return
    fetch(`${api_path}cards.php?name=${userHardCode}&type=freeCards`)
      .then(res => res.json())
      .then(res => {
        if (fetched.length === 0) {
          res.forEach(element => {
            cards_list.push(
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
          })
          // console.log('cards list ->', cards_list)
          setFetched(cards_list)
        }
      })
      .catch(err => 
        setFetched([<CardsMessages caption="message_freeCardsError" key="free-cards" err={err} />]))
  })

  return (
      <div className="content-cards-body-freeCards">
        {fetched}
      </div>
  )
}

export default FreeCards
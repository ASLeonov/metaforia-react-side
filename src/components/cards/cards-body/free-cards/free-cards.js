import React from 'react'
import {useState, useEffect} from 'react'
import './free-cards.css'

function FreeCards() {

  const [fetched, setFetched] = useState([])

  const userHardCode = "tanyaleo81@yandex.ru"
  const cards_list = []

  useEffect( () => {
    fetch(`http://localhost/ll/cards.php?name=${userHardCode}&type=freeCards`)
      .then(res => res.json())
      .then(res => {
        if (fetched.length === 0) {
          res.forEach(element => {
            cards_list.push(
              <div className="freeCards-item" key={element.freecards_id}>
                <img
                  src={`./images/${element.freecards_img}`}
                  className="freeCards-item-img"
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
      .catch(err => console.log('error', err))
  })

  return (
      <div className="content-cards-body-freeCards">
        {fetched}
      </div>
  )
}

export default FreeCards
import React from 'react'
import {NavLink} from "react-router-dom"
import './cards-caption.css'

function CardsCaption() {

  const CN_default = "content-cards-caption__title"
  const ACN = "content-cards-caption__title___active"

  return (
    <div className="content-cards-caption">
      <NavLink to="/free-cards" className={CN_default} activeClassName={ACN}>
        Доступные колоды
      </NavLink>
      <NavLink to="/pay-cards" className={CN_default} activeClassName={ACN}>
        Дополнительные колоды
      </NavLink>
      <NavLink to="/client-cards" className={CN_default} activeClassName={ACN}>
        Закачать свою колоду
      </NavLink>
    </div>
  )

}

export default CardsCaption
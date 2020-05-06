import React from 'react'
import {NavLink} from "react-router-dom"
import './sessions-caption.css'

function SessionsCaption(props) {

  const CN_default = "content-sessions-caption__title"
  const ACN = "content-sessions-caption__title___active"

  console.log('render Sessions Caption')

  return (
    <div className="content-sessions-caption">
      <NavLink to="/current-sessions" className={CN_default} activeClassName={ACN}>
        Текущие сессии
      </NavLink>
      <NavLink to="/last-sessions" className={CN_default} activeClassName={ACN}>
        Прошедшие сессии
      </NavLink>
    </div>
  )

}

export default SessionsCaption
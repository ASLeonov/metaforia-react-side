import React from 'react'
import {Link} from "react-router-dom"
import './sidebar.css'

function Sidebar(props) {

  const CN_default = "sidebar-buttons sidebar-sessions"
  const ACN = "sidebar-buttons-active"

  // console.log('render Sidebar')

  return (
      <div className="sidebar">
        <Link to="/current-sessions" className={(props.activePage === "sessions") ? `${CN_default} ${ACN}` : CN_default}>
          Сессии
        </Link>
        <Link to="/free-cards" className={(props.activePage === "cards") ? `${CN_default} ${ACN}` : CN_default}>
          Колоды
        </Link>
        <Link to="/contacts" className={(props.activePage === "contacts") ? `${CN_default} ${ACN}` : CN_default}>
          Контакты
        </Link>
      </div>
  )
  
}

export default Sidebar
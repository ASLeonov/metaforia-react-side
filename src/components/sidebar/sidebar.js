import React from 'react'
import {useSelector} from 'react-redux'
import {Link} from "react-router-dom"
import './sidebar.css'

function Sidebar(props) {
  const userType = useSelector(state => state.user.type)

  const CN_default = "sidebar-buttons sidebar-sessions"
  const ACN = "sidebar-buttons-active"

  // console.log('render Sidebar')

  return (
      <div className="sidebar">
        <Link to="/current-sessions" className={(props.activePage === "sessions") ? `${CN_default} ${ACN}` : CN_default}>
          Сессии
        </Link>
        {userType === 'master' ? 
          <>
            <Link to="/free-cards" className={(props.activePage === "cards") ? `${CN_default} ${ACN}` : CN_default}>
              Колоды
            </Link>
            <Link to="/contacts" className={(props.activePage === "contacts") ? `${CN_default} ${ACN}` : CN_default}>
              Контакты
            </Link>
          </> : null}
      </div>
  )
}

export default Sidebar
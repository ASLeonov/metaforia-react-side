import React from 'react'
import {useState} from 'react'
import './sidebar.css'

function Sidebar(props) {

  const [activeMenu, setActiveMenu] = useState(props.activePage)

  const {changePage} = props

  const onHandleClick = event => {
    const currnetTarget = event.target.attributes.targetlink.value
      if (currnetTarget !== activeMenu) {
        setActiveMenu(currnetTarget)
        changePage(currnetTarget)
      }          
  }

  const classNameDefault = "sidebar-buttons sidebar-sessions"

  return (
      <div className="sidebar">
        <div
          className={activeMenu === 'sessions' ? `${classNameDefault} sidebar-buttons-active` : classNameDefault}
          onClick={onHandleClick}
          targetlink="sessions"
        >
          Сессии
        </div>
        <div
          className={activeMenu === 'cards' ? `${classNameDefault} sidebar-buttons-active` : classNameDefault}
          onClick={onHandleClick}
          targetlink="cards"
        >
          Колоды
        </div>
        <div
          className={activeMenu === 'contacts' ? `${classNameDefault} sidebar-buttons-active` : classNameDefault}
          onClick={onHandleClick}
          targetlink="contacts"
        >
          Контакты
        </div>
      </div>
  )
  
}

export default Sidebar
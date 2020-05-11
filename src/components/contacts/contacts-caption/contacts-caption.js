import React from 'react'
import {NavLink} from 'react-router-dom'
import './contacts-caption.css'

function ContactsCaption() {

  const CN_default = "content-contacts-caption__title"
  const ACN = "content-contacts-caption__title___active"

  return (
    <div className="content-contacts-caption">
      <NavLink to="/contacts" className={CN_default} activeClassName={ACN}>
        Ваши контакты
      </NavLink>
      <NavLink to="/add-contacts" className={CN_default} activeClassName={ACN}>
        Добавить контакт
      </NavLink>
    </div>
  )
}

export default ContactsCaption
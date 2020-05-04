import React from 'react'
import Contact from './contact'
import {contacts} from '../../fixtures/contacts'
import './contacts.css'

function Contacts(props) {
  const userHardCode = "tanyaleo81@yandex.ru"

  const clients_list = []

  const contacts_for_user = contacts[userHardCode]

  if (contacts_for_user) {
    for (const key in contacts_for_user) {
      clients_list.push(
        <Contact
          key={contacts_for_user[key].client_id}
          clientData={contacts_for_user[key]}
        />
      )
    }
  } else {
    clients_list.push(
      <p className="content-contacts-list__item" key='no_clients'>
        Клиентов пока нет.
      </p>
    )
  }

  return (
      <div className="content-contacts">
        <div className="content-contacts-list">
          <p className="content-contacts-list__title">
            Список Ваших клиентов
          </p>
          <div className="content-contacts-list__body">
            {clients_list}
          </div>
        </div>
        <div className="content-contacts-other">
          <button className="content-contacts-list__item___button buttonAddClient">
            Добавить нового клиента
          </button>
        </div>
      </div>
  )
}

export default Contacts
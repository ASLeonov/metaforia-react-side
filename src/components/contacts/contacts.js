import React from 'react'
import {useState, useEffect} from 'react'
import Contact from './contact'
// import {contacts} from '../../fixtures/contacts'
import './contacts.css'

function Contacts(props) {

  const [fetched, setFetched] = useState([])
  const userHardCode = "tanyaleo81@yandex.ru"
  const clients_list = []

  useEffect( () => {
    fetch(`http://localhost/ll/clients.php?${userHardCode}`)
      .then(res => res.json())
      .then(res => {
        if (fetched.length === 0) {
          res.forEach(element => {
            clients_list.push(
              <Contact
                key={element.client_id}
                clientData={element}
              />
            )         
          })
          console.log('client list ->', clients_list)
          setFetched(clients_list)
        }
      })
      .catch(err => console.log('error', err))
  })

  return (
      <div className="content-contacts">
        <div className="content-contacts-list">
          <p className="content-contacts-list__title">
            Список Ваших клиентов
          </p>
          <div className="content-contacts-list__body">
            {fetched}
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
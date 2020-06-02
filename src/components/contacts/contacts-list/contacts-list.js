import React, {useState} from 'react'
import './contacts-list.css'

function ContactsList(props) {
  const [isActive, setIsActive] = useState(props.activeContact)

  const CN_default = "contacts-list-item"
  const ACN = "contacts-list-item contacts-list-item__active"

  const onHandleClick = event => {
    const this_client_id = event.target.attributes.attr_client_id.value
    if (isActive !== this_client_id) {
      setIsActive(this_client_id)
      props.changeActiveContact(this_client_id)
    }
  }

  const list = props.data.map(element => (
    <div
      key={element.client_id}
      className={element.client_id === isActive ? ACN : CN_default} onClick={onHandleClick}
      attr_client_id={element.client_id}
    >
      {`${element.client_name} ${element.client_surname}`}
    </div>
  ))

  console.log('render contact list')

  return (
    <div className="contacts-list-wrapper">
      {list}
    </div>
  )
}

export default ContactsList

// ПРОВЕРЕНО ЛОКАЛЬНО. В ПРОДАКШН НЕ НУЖНО, Т.К. НЕТ СЕТЕВЫХ ЗАПРОСОВ.

// Корректная работа:
// Компонент вызывается сейчас только из <CurrentContacts />.
// Активный клиент (выделенный) берется из props и устанавливается в state компонента.
// Если кликаем на другого клиента (при этом проверяем, что именно на другом, а не на текущем), то устанавливаем новый стейт и вызываем callback для переустановки активного клиента в верхнем компоненте <CurrentContacts /> чтобы обновить <ContactItem /> в нем.
// Рендер один, проблем нет.
import React, {useState} from 'react'
import './contacts-list.css'

function ContactsList(props) {
  const [isActive, setIsActive] = useState('')

  const CN_default = "contacts-list-item"
  const ACN = "contacts-list-item contacts-list-item__active"

  const onHandleClick = event => {
    setIsActive(event.target.attributes.attr_id.value)
    props.changeActiveContact(event.target.attributes.attr_id.value)
  }

  const list = props.data.map(element => (
    <div key={element.client_id} className={element.client_id === isActive ? ACN : CN_default} onClick={onHandleClick} attr_id={element.client_id}>
      {`${element.client_name} ${element.client_surname}`}
    </div>
  ))

  console.log('isActive ->',isActive)

  return (
    <div className="contacts-list-wrapper">
      {list}
    </div>
  )
}

export default ContactsList
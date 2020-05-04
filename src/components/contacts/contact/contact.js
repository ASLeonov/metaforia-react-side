import React from 'react'
import {useState} from 'react'
import './contact.css'

function Contact(props) {

  const [isActive, setIsActive] = useState(false)

  const onHandleClick = event => {
    setIsActive(!isActive)
  }

  const client_data = (
    <div className="content-contacts-list__item">
      <div className="content-contacts-list__item___firstline">
        <p className={isActive ? "content-contacts-list__item___pointer____active" : "content-contacts-list__item___pointer"}>❯</p>
        <span 
          className={isActive ? "content-contacts-list__item___data____active" : "content-contacts-list__item___data"}
          onClick={onHandleClick}
        >
          {props.clientData.client_name}&nbsp;
          {props.clientData.client_surname}
        </span>
      </div>
      <div className={isActive === true ? "content-contacts-list__item___openBlock" : "content-contacts-list__item___closeBlock"}>
        <p>
          Пол: {props.clientData.client_gender}
        </p>
        <p>
          E-mail: {props.clientData.client_email}
        </p>
        <p>
          Примечание: {props.clientData.client_descr}
        </p>
        <button className="content-contacts-list__item___button buttonInvite">
          Отправить приглашение
        </button>
        <button className="content-contacts-list__item___button buttonEdit">
          Редактировать
        </button>
      </div>
    </div>
  )
  
  return (
      <div>
        {client_data}
      </div>
  )
}

export default Contact
import React from 'react'
import {useState, useEffect} from 'react'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import './contact.css'

function Contact(props) {

  const {client_name, client_surname, client_gender, client_email, client_descr} = props.clientData

  const [isActive, setIsActive] = useState(false)

  const onHandleClick = () => {
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
          {client_name}&nbsp;
          {client_surname}
        </span>
      </div>
      {/* <TransitionGroup> */}
        <CSSTransition in={!isActive} timeout={500} classNames="ccc" key={client_email} appear={true}>
          <div>
          {/* <div className={isActive ? "content-contacts-list__item___openBlock" : "content-contacts-list__item___closeBlock"}> */}
            <p>
              Пол: {client_gender}
            </p>
            <p>
              E-mail: {client_email}
            </p>
            <p>
              Примечание: {client_descr}
            </p>
            <button className="content-contacts-list__item___button buttonInvite">
              Отправить приглашение
            </button>
            <button className="content-contacts-list__item___button buttonEdit">
              Редактировать
            </button>
          </div>
        </CSSTransition>
      {/* </TransitionGroup> */}
    </div>
  )

  // useEffect(() => {
  //   if (isActive === null) {
  //     setIsActive(false)
  //   }
  // })
  // console.log(isActive)
  
  return (
    <div>
      {client_data}
    </div>
  )
}

export default Contact
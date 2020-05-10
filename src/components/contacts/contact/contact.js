import React from 'react'
import {useState,} from 'react'
import {CSSTransition} from 'react-transition-group'
import {connect} from 'react-redux'
import {getContacts} from '../../../store/action-creators'
import {selectUser} from '../../../store/selectors'
import {api_path} from '../../../store/common'
import './contact.css'

function Contact(props) {

  const {client_id, client_name, client_surname, client_gender, client_email, client_descr} = props.clientData

  const [isActive, setIsActive] = useState(false)
  const [clientData, setClientData] = useState({name:client_name, surname:client_surname, gender:client_gender, email:client_email, descr:client_descr})
  const [isEdit, setIsEdit] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const onActiveClick = () => {
    setIsActive(!isActive)
  }

  const onEditClick = event => {
    event.preventDefault()
    isEdit && setClientData({name:client_name, surname:client_surname, gender:client_gender, email:client_email, descr:client_descr})
    setIsEdit(!isEdit)
  }
  const formElementCN = isEdit ? "form__isEdit" : "form__noEdit"

  const handleChange = event => {
    if (isEdit) {
      setClientData({...clientData, [event.target.name]: event.target.value})
    }
  }

  const handleSubmit = event => {
    event.preventDefault()
    // setIsEdit(false)
    setIsUpdating(true)
    fetch(`${api_path}clients.php`, {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},
      body: `update=ok&user_name=${props.user.login}&client_id=${client_id}&client_name=${clientData.name}&client_surname=${clientData.surname}&client_gender=${clientData.gender}&client_email=${clientData.email}&client_descr=${clientData.descr}`
    })
      .then(response => response.text())
      .then(data => {
        if (data === 'UPDATE_CLIENT') {
          props.getContacts()
        }
      })
      .catch(e => console.log('catch error =>',e))
  }

  const client_data = (
    <div className="content-contacts-list__item">
      <div className="content-contacts-list__item___firstline">
        <p className={isActive ? "content-contacts-list__item___pointer____active" : "content-contacts-list__item___pointer"}>❯</p>
        <span 
          className={isActive ? "content-contacts-list__item___data____active" : "content-contacts-list__item___data"}
          onClick={onActiveClick}
        >
          {client_name}&nbsp;
          {client_surname}
        </span>
      </div>
      <CSSTransition in={!isActive} timeout={500} classNames="ccc" key={client_email} appear={true}>
        <form onSubmit={handleSubmit}>
          <div className={isUpdating ? "form_blocker" : "form_blocker__none"}>
          </div>
          <label>
            <span>Имя:</span>
            <input type="text" className={formElementCN} name="name" value={clientData.name} onChange={handleChange} />
          </label>
          <label>
            <span>Фамилия:</span>
            <input type="text" className={formElementCN} name="surname" value={clientData.surname} onChange={handleChange} />
          </label>
          <label>
            <span>Пол:</span>
            <input type="text" className={formElementCN} name="gender" value={clientData.gender} onChange={handleChange} />
          </label>
          <label>
            <span>E-mail:</span>
            <input type="text" className={formElementCN} name="email" value={clientData.email} onChange={handleChange} />
          </label>
          <label className="content-contacts-list__item___description">
            <span>Примечание:</span>
            <textarea className={formElementCN} name="descr" value={clientData.descr} onChange={handleChange} />
          </label>
          <div className="content-contacts-list__item___buttons">
            <input type="button" className={isEdit ? "content-contacts-list__item___button hide_button" : "content-contacts-list__item___button"} value="Начать сессию" />
            <input type="button" className={isEdit ? "content-contacts-list__item___button hide_button" : "content-contacts-list__item___button"} value="Редактировать" onClick={onEditClick} />
            {/* <button className={isEdit ? "content-contacts-list__item___button hide_button" : "content-contacts-list__item___button"} onClick={onEditClick}>
                Редактировать
            </button> */}
            <input type="submit" className={isEdit ? "content-contacts-list__item___button" : "content-contacts-list__item___button hide_button"} value="Сохранить" />
            <input type="button" className={isEdit ? "content-contacts-list__item___button" : "content-contacts-list__item___button hide_button"} value="Отменить" onClick={onEditClick} />
          </div>
        </form>
      </CSSTransition>
    </div>
  )

  if (isEdit && isUpdating && client_name === clientData.name) {
    setIsUpdating(false)
    setIsEdit(false)
  }

  // console.log('isUpdating', isUpdating)

  return (
    <div>
      {client_data}
    </div>
  )
}

export default connect(
  state => {
    return {
      user: selectUser(state)
    }
  },
  {
    getContacts: getContacts
  }
)(Contact)
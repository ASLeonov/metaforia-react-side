import React, {useState, useEffect} from 'react'
import {api_path} from '../../../store/common'

function ContactItem(props) {

  const {client_id, client_name, client_surname, client_gender, client_email, client_descr} = props.activeContact[0] ? props.activeContact[0] : ''

  const [clientData, setClientData] = useState({name:client_name, surname:client_surname, gender:client_gender, email:client_email, descr:client_descr})
  const [isEdit, setIsEdit] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

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

  const client_data = props.activeContact.length > 0 ? (
    <div className="content-contacts-list__item">
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
    </div>
  ) : ""

  useEffect( () => {
    setClientData({name:client_name, surname:client_surname, gender:client_gender, email:client_email, descr:client_descr})
  }, [client_id, client_name, client_surname, client_gender, client_email, client_descr])

  return (
    <div>
      {client_data}
    </div> 
  )
}

export default ContactItem
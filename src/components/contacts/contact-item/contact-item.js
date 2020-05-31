import React, {useState, useEffect, useRef} from 'react'
import {Link} from "react-router-dom"
import {CSSTransition} from 'react-transition-group'
import {api_path} from '../../../store/common'
import './contact-item.css'

function ContactItem(props) {

  const {client_id, client_name, client_surname, client_gender, client_email, client_descr} = props.activeContact[0]

  const [clientData, setClientData] = useState({name:client_name, surname:client_surname, gend:client_gender, email:client_email, descr:client_descr})
  const [isEdit, setIsEdit] = useState(false)
  const [badValues, setBadValues] = useState({})
  const [animate, setAnimate] = useState(false)

  const redirectBtn = useRef(null)

  const onDeleteClick = event => {
    event.preventDefault()                  // надо ли?
    fetch(`${api_path}clients.php`, {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},
      body: `delete=ok&user_name=${props.user.login}&client_id=${client_id}`
    })
      .then(response => response.text())
      .then(data => {
        if (data === 'DELETE_CLIENT') {
          props.getContacts()
        }
      })
      .catch(e => console.log('catch error =>', e))
  }

  const onEditClick = event => {
    event.preventDefault()
    isEdit && setClientData({name:client_name, surname:client_surname, gend:client_gender, email:client_email, descr:client_descr})
    setIsEdit(!isEdit)
  }
  const formElementCN = isEdit ? "form__isEdit" : "form__noEdit"

  const handleChange = event => {
    if (!isEdit) return
      if (event.target.name === 'name' || event.target.name === 'email') {
        if (event.target.value.replace(/<\/?[a-zA-Z]+>/gi,'').length === 0 || event.target.value.replace(/ /gi,'').length === 0) {
          setBadValues({...badValues, [event.target.name]: `-${event.target.value}-`})
        } else {
          const new_bad_values = {...badValues}
          delete new_bad_values[event.target.name]
          console.log('new_bad_values', new_bad_values)
          setBadValues({...new_bad_values})
        }
      } else {
        const value_with_tags = event.target.value.match(/<\/?[a-zA-Z]+>/gi)
        if (value_with_tags && value_with_tags.length !== 0) {
          console.log('value_with_tags', value_with_tags)
          setBadValues({...badValues, [event.target.name]: `-${event.target.value}-`})
        } else {
          const new_bad_values = {...badValues}
          delete new_bad_values[event.target.name]
          setBadValues({...new_bad_values})
        }
      }
    setClientData({...clientData, [event.target.name]: event.target.value})
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (Object.keys(badValues).length > 0) return
    if  (clientData.name === client_name && clientData.surname === client_surname && clientData.gend === client_gender && // Нажали сохранить ничего не изменив
        clientData.email === client_email && clientData.descr === client_descr) {
          setIsEdit(false)
          return
        }

    const client_name_Up    = clientData.name.trim()[0].toUpperCase()    + clientData.name.trim().slice(1)
    const client_surname_Up = clientData.surname.trim()[0].toUpperCase() + clientData.surname.trim().slice(1)
    const client_gender_Up  = clientData.gend.trim() ? clientData.gend.trim()[0].toUpperCase()  + clientData.gend.trim().slice(1) : ''

    fetch(`${api_path}clients.php`, {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},
      body: `update=ok&user_name=${props.user.login}&client_id=${client_id}&client_name=${client_name_Up}&client_surname=${client_surname_Up}&client_gender=${client_gender_Up}&client_email=${clientData.email}&client_descr=${clientData.descr}`
    })
      .then(response => response.text())
      .then(data => {
        if (data === 'UPDATE_CLIENT') {
          props.getContacts()
        }
      })
      .catch(e => console.log('catch error =>', e))
  }

  const startSession = event => {
    event.preventDefault()      // и без этого работает
    fetch(`${api_path}sessions.php`, {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},
      body: `insert=ok&user_name=${props.user.login}&client_id=${client_id}`
    })
      .then(response => response.text())
      .then(data => {
        if (data === 'INSERT_SESSION') {
          let promise = new Promise(function(resolve, reject) {
        // В принципе промис совсем не обязательно, т.к. после обновления стора страница текущих сессий перерендерится в любом случае.
            resolve(props.getCurrentSessions())
          })
          promise.then(         // resolve запустит первую функцию, переданную в .then
            () => redirectBtn.current.click(),
            error => console.log(error)
          )
        }
      })
      .catch(e => console.log('catch error =>', e))
  }

  const client_data = (
    <div className="content-item-form">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <label>
          <span>Имя<sup>*</sup>:</span>
          <input type="text" className={formElementCN} name="name" value={clientData.name} onChange={handleChange} placeholder="Обязательное поле"/>
          <span className="item-form-verification" style={badValues["name"] ? {color:'red'} : {color:'green'}}>{badValues["name"] ? '❗' : '✔'}</span>
        </label>
        <label>
          <span>Фамилия:</span>
          <input type="text" className={formElementCN} name="surname" value={clientData.surname} onChange={handleChange} />
          <span className="item-form-verification" style={badValues["surname"] ? {color:'red'} : {color:'green'}}>{badValues["surname"] ? '❗' : '✔'}</span>
        </label>
        <label>
          <span>Пол:</span>
          <input type="text" className={formElementCN} name="gend" value={clientData.gend} onChange={handleChange} />
          <span className="item-form-verification" style={badValues["gender"] ? {color:'red'} : {color:'green'}}>{badValues["gender"] ? '❗' : '✔'}</span>
        </label>
        <label>
          <span>E-mail<sup>*</sup>:</span>
          <input type="text" className={formElementCN} name="email" value={clientData.email} onChange={handleChange} />
          <span className="item-form-verification" style={badValues["email"] ? {color:'red'} : {color:'green'}}>{badValues["email"] ? '❗' : '✔'}</span>
        </label>
        <label className="content-contacts-list__item___description">
          <span>Примечание:</span>
          <textarea className={formElementCN} name="descr" value={clientData.descr} onChange={handleChange} />
        </label>
        <p><span style={{fontSize: '110%', fontWeight: 'bold', color: 'red'}}>*</span> - обязательно для заполнения</p>
        <div className="content-item-form___buttons">
          <input type="button" className={isEdit ? "content-item-form___button hide_button" : "content-item-form___button"} value="Начать сессию" onClick={startSession}/>
          <input type="button" className={isEdit ? "content-item-form___button hide_button" : "content-item-form___button"} value="Редактировать" onClick={onEditClick} />
          <input type="submit" className={isEdit ? "content-item-form___button" : "content-item-form___button hide_button"} value="Сохранить" />
          <input type="button" className={isEdit ? "content-item-form___button" : "content-item-form___button hide_button"} value="Отменить" onClick={onEditClick} />
          <input type="button" className={isEdit ? "content-item-form___button" : "content-item-form___button hide_button"} value="Удалить" onClick={onDeleteClick} />
        </div>
      </form>
    </div>
  )

  useEffect( () => {
    setClientData({name:client_name, surname:client_surname, gend:client_gender, email:client_email, descr:client_descr})
    setIsEdit(false)
    if (!animate) setAnimate(true)
  }, [client_id, client_name, client_surname, client_gender, client_email, client_descr])

console.log('badValues', badValues)

  return (
    <div>
      {animate ? 
        <CSSTransition in={animate} timeout={700} classNames="contact-item-animate" appear={true}>    
          {client_data}
        </CSSTransition> : <p></p>
      }
      <Link style={{display:'none'}} ref={redirectBtn} to="/current-sessions" />
    </div>
  )
}

export default ContactItem

//   
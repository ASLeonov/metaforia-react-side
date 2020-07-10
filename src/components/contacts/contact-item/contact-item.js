import React, {useState, useEffect, useRef} from 'react'
import {Link} from 'react-router-dom'
import Alerts from '../../alerts'
import {validateField} from '../../../functions/form-validate'
import './contact-item.css'

function ContactItem(props) {

  const {client_id, client_name, client_surname, client_gender, client_email, client_descr} = props.activeContact[0]

  const [clientData, setClientData] = useState({name:client_name, surname:client_surname, gend:client_gender, email:client_email, descr:client_descr})
  const [isEdit, setIsEdit] = useState(false)
  const [badValues, setBadValues] = useState({})
  const [showAlert, setShowAlert] = useState([])

  const redirectBtn = useRef(null)

  const onDeleteClick = () => {
    const send_data = {
      user_login: props.user.login,
      client_id:  client_id,
      user_tools: props.user.tools
    }
    fetch(`/api/deleteclient`, {
      method:  'DELETE',
      headers: {'Content-Type':'application/json; charset=UTF-8'},
      body:    JSON.stringify(send_data)
    })
      .then(response => response.text())
      .then(data => {
        if (data === 'DELETE_CLIENT') {
          props.getContacts()
          props.getCurrentSessions()
        } else {
          setShowAlert([
            'notification',
            'column',
            'alert_contactsDeleteError',
            () => setShowAlert([]),
          ])
        }
      })
      .catch(e => console.log('catch error =>', e))
  }

  const onCancelClick = event => {
    if (String(Object.values(clientData)).replace(/,/g,'').length > 0) {
      setClientData({name:'', surname:'', gend:'', email:'', descr:''})
      setBadValues({name:'initial', email:'initial'})
    } 
  }

  const onEditClick = event => {
    if (isEdit) {
      setClientData({name:client_name, surname:client_surname, gend:client_gender, email:client_email, descr:client_descr})
      setIsEdit(false)
      setBadValues({})
    } else {
      setIsEdit(true)
    }
  }
  const formElementCN = isEdit ? "form__isEdit" : "form__noEdit"

  const handleChange = event => {
    if (!isEdit) return

    const isRequired = (event.target.name === 'name' || event.target.name === 'email') ? true : false
      if (validateField([event.target.name, event.target.value, isRequired])) {
        const new_bad_values = {...badValues}
        delete new_bad_values[event.target.name]
        setBadValues({...new_bad_values})
      } else {
        setBadValues({...badValues, [event.target.name]: `-${event.target.value}-`})
      }
    
    setClientData({...clientData, [event.target.name]: event.target.value})
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (Object.keys(badValues).length > 0 || String(Object.values(clientData)).replace(/,/g,'').length === 0) return
    if  (clientData.name === client_name && clientData.surname === client_surname && clientData.gend === client_gender && // Нажали сохранить ничего не изменив
        clientData.email === client_email && clientData.descr === client_descr) {
          setIsEdit(false)
          return
        }

    const client_name_Up    = clientData.name.trim() ? clientData.name.trim()[0].toUpperCase()        + clientData.name.trim().slice(1)     : ''
    const client_surname_Up = clientData.surname.trim() ? clientData.surname.trim()[0].toUpperCase()  + clientData.surname.trim().slice(1)  : ''
    const client_gender_Up  = clientData.gend.trim() ? clientData.gend.trim()[0].toUpperCase()        + clientData.gend.trim().slice(1)     : ''

    const send_data = {
      user_login:     props.user.login,
      client_id:      client_id,
      client_name:    client_name_Up,
      client_surname: client_surname_Up,
      client_gender:  client_gender_Up,
      client_email:   clientData.email,
      client_descr:   clientData.descr,
      user_tools:     props.user.tools
    }
    fetch(`/api/${props.type === 'add_contact' ? 'addclient' : 'editclient'}`, {
      method:  'POST',
      headers: {'Content-Type':'application/json; charset=UTF-8'},
      body:    JSON.stringify(send_data)
    })
      .then(response => response.text())
      .then(data => {
        if (data === 'UPDATE_CLIENT') {
          props.getContacts()
        } else if (data === 'INSERT_CLIENT') {
          setClientData({name:'', surname:'', gend:'', email:'', descr:''})
          setBadValues({name:'initial', email:'initial'})
          setShowAlert([
            'notification',
            'column',
            'alert_contactsInsert',
            () => setShowAlert([])
          ])
          props.getContacts()
        } else {
          setShowAlert([
            'notification',
            'column',
            'alert_contactsSubmitError',
            () => setShowAlert([])
          ])
        }
      })
      .catch(e => console.log('catch error =>', e))
  }

  const startSession = event => {
    const send_data = {
      user_login:     props.user.login,
      client_id:      client_id,
      user_tools:     props.user.tools
    }
    fetch(`/api/createsession`, {
      method:  'POST',
      headers: {'Content-Type':'application/json; charset=UTF-8'},
      body:    JSON.stringify(send_data)
    })
      .then(response => response.text())
      .then(data => {
        if (data === 'INSERT_SESSION') {
          redirectBtn.current.click()
          props.currentSessions.isLoaded && props.getCurrentSessions()
        } else if (data === 'DOUBLE_SESSION') {
          setShowAlert([
            'notification',
            'column',
            'alert_contactsStartSessionDouble',
            () => setShowAlert([])
          ])
        } else {
          setShowAlert([
            'notification',
            'column',
            'alert_contactsStartSessionError',
            () => setShowAlert([])
          ])
        }
      })
      .catch(e => console.log('catch error =>', e))
  }

  const client_data = (
    <div className="content-item-form">
      <form autoComplete="off" onSubmit={handleSubmit} style={showAlert.length > 0 ? {opacity:'0'} : {}}>
        <label>
          <span>Имя<sup>*</sup>:</span>
          <input type="text" className={formElementCN} name="name" value={clientData.name} onChange={handleChange} placeholder="Введите имя клиента (обязательно)" />
          <span className="item-form-verification" style={badValues["name"] ? {color:'red'} : {color:'green'}}>{badValues["name"] ? '❗' : '✔'}</span>
        </label>
        <label>
          <span>Фамилия:</span>
          <input type="text" className={formElementCN} name="surname" value={clientData.surname} onChange={handleChange} placeholder="Введите фамилию клиента" />
          <span className="item-form-verification" style={badValues["surname"] ? {color:'red'} : {color:'green'}}>{badValues["surname"] ? '❗' : '✔'}</span>
        </label>
        <label>
          <span>Пол:</span>
          <input type="text" className={formElementCN} name="gend" value={clientData.gend} onChange={handleChange} placeholder="Введите пол клиента" />
          <span className="item-form-verification" style={badValues["gend"] ? {color:'red'} : {color:'green'}}>{badValues["gend"] ? '❗' : '✔'}</span>
        </label>
        <label>
          <span>E-mail<sup>*</sup>:</span>
          <input type="text" className={formElementCN} name="email" value={clientData.email} onChange={handleChange} placeholder="Введите e-mail клиента (обязательно)" autoComplete="->" />
          <span className="item-form-verification" style={badValues["email"] ? {color:'red'} : {color:'green'}}>{badValues["email"] ? '❗' : '✔'}</span>
        </label>
        <label className="content-contacts-list__item___description">
          <span>Примечание:</span>
          <textarea className={formElementCN} name="descr" value={clientData.descr} onChange={handleChange} placeholder="Введите заметки по клиенту" />
          <span className="item-form-verification-top" style={badValues["descr"] ? {color:'red'} : {color:'green'}}>{badValues["descr"] ? '❗' : '✔'}</span>
        </label>
        <p><span style={{fontSize: '110%', fontWeight: 'bold', color: 'red'}}>*</span> - обязательно для заполнения</p>
        <div className="contact-form-buttons">
          {props.type !== "add_contact" ?
            <>
              <input type="button" className={isEdit ? "contact-form-button contact-form-button_hide" : "contact-form-button"} value="Начать сессию" onClick={startSession}/>
              <input type="button" className={isEdit ? "contact-form-button contact-form-button_hide" : "contact-form-button"} value="Редактировать" onClick={onEditClick} />
              <input type="submit" className={isEdit ? "contact-form-button" : "contact-form-button contact-form-button_hide"} value="Сохранить" />
              <input type="button" className={isEdit ? "contact-form-button" : "contact-form-button contact-form-button_hide"} value="Отменить" onClick={onEditClick} />
              <input
                type="button"
                className={isEdit ? "contact-form-button" : "contact-form-button contact-form-button_hide"}
                value="Удалить"
                onClick={() => setShowAlert(['request', 'column', 'alert_contactsDelete', onDeleteClick, () => setShowAlert([])])}
              />
            </> : 
            <>
              <input
                type = "submit"
                className = {
                  ((String(Object.values(clientData)).replace(/,/g,'').length === 0) || Object.keys(badValues).length > 0) ? 
                  "contact-form-button contact-form-button_disabled" : "contact-form-button"
                }
                value = "Сохранить"
              />
              <input
                type = "button"
                className = {(String(Object.values(clientData)).replace(/,/g,'').length > 0) ? "contact-form-button" : "contact-form-button contact-form-button_disabled"}
                value = "Отменить"
                onClick = {onCancelClick}
              />
            </>
          }
        </div>
      </form>
      {showAlert.length > 0 ? 
        <Alerts
          data = {{messageType: showAlert[0], direction: showAlert[1], text: showAlert[2]}}
          applyChanges = {showAlert[3]}
          discardChanges = {showAlert[4]}
        /> : ''
      }
    </div>
  )

  useEffect(() => {
    if (props.type === "add_contact") {
      setIsEdit(true)
      setBadValues({name:'initial', email:'initial'})
    }
  }, [props.type])

    console.log('render form')

  return (
    <div>
      {client_data}
      <Link style={{display:'none'}} ref={redirectBtn} to="/current-sessions" />
    </div>
  )
}

export default ContactItem

// ПРОВЕРЕНО ЛОКАЛЬНО

// КОРРЕКТНАЯ РАБОТА

// При вызове из <CurrentContacts />:
// Происходит один рендер компонента даже несмотря на имеющийся useEffect - в нем нет сетстейтов при загрузке из <CurrentContacts />, только из <AddContacts />, а зависимость props.type неизменна в пределах текущего вызова (props.type вписал, чтобы компилятор warning не выкидывал).
// Работа кнопок в этом случае:
// Нажатие 'Редактировать'. Один рендер, установка стейта isEdit = true (режим редактирования) -> ok. 
// Нажатие 'Начать сессию'. Фетчим POST-запрос на добавление сессии. Если ok, то делаем редирект на страницу текущих сессий и проверяем, если текущие сессии уже загружены, то после редиректа еще раз загружаем их, если не загружены, то не загружаем - они сами подгрузятся при переходе на страницу текущих сессиий. Эта проверка нужна для того, чтобы убрать лишний рендер <CurrentContacts /> и всех его детей и избежать двойного фетча текущих сессий на сервер (что совсем плохо). Если не ok (есть дублирующие открытые сессии или вообще ошибка, то алерт).
// Нажатие 'Сохранить'. Если нажали ничего не изменив, то просто выходим из режима редактирования - isEdit = false. Если изменения внесены, то фетчим POST-запрос на обновление. Если данные обновились - фетчим клиентов.
// Нажатие 'Отменить'. Были внесены изменения или нет - мы приводим стейт компонента к начальному состоянию. Здесь проверка на изменения не нужна, т.к. три сетстейта стоят рядом и в итоге все равно один рендер происходит.
// Нажатие 'Удалить'. Показываем алерт с подтверждением, если ответ отрицательный, то просто убираем сообщение. Ответ положительный - вызывается onDeleteClick(), если ответ от сервера положительный, то фетчим по новой контакты и текущие сессии (если этого не сделать и они закачаны на момент удаления, то в будут отображаться сессии по удаленному клиенту).
// При нажатии кнопок лишних рендеров и фетчей нет, все по делу.

// При вызове из <AddContacts />:
// Происходит два рендера компонента. Это так, потому что есть useEffect, срабатывающий после монтирования компонента (в зависимостях указан также props.type, но это ни на что не влияет, т.к. эта пропса неизменна в пределах текущего вызова, вписал, чтобы компилятор warning не выкидывал). На нем завязаны настройки для подключения в <AddContacts /> (а именно установка в режим редактирования (isEdit) без нажатия пользователем кнопки 'Редактировать' и установка плохих значений (badValues) чтобы отсвечивать ошибки инпутов сразу при загрузке при подключении компонента в <AddContacts />). Эти сетстейты и вызовут второй рендер компонента.
// Работа кнопок в этом случае:
// Здесь кнопки свои, их две - сохранить и отменить. Начальное состояние кнопок - отключены.
// Кнопка 'Отменить' активируется после любого ввода с клавиатуры и приводит компонент к исходному состоянию стейта.
// Кнопка 'Сохранить' активируется только если валидация прошла успешно, приводит к POST-запросу на добавление клиента. Если клиент добавился - приводим стэйт к начальному состоянию, показываем алерт, фетчим клиентов. Здесь будет три рендера компонента из-за изменения стейтов (побороть не удалось, Реакт делает три сетстейта setClientData, setBadValues, setShowAlert отдельно - никакие манипуляции не помогли, придется оставить так; кстати поэтому и алерт идет последним, чтобы рендерится один раз, иначе тоже будет три рендера) и два рендера (тут все по делу) на обновление store после фетча клиентов.
// При нажатии кнопок лишних рендеров и фетчей нет, все по делу.

// Алерты.
// Если есть непустой стейт showAlert (по дефолту пустой массив), то вызывется алерт с данными из этого стейта.
// Структура массива: 0 - тип алерта(notification, request), 1 - расположение(column, row), 2 - текст сообщения из fixtures alerts.js, 3 - Функция принять изменения, 4 - Функция отменить изменения (не обязательный параметр, при notification можно не указывать).
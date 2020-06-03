import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import Alerts from '../../../alerts'
import {api_path} from '../../../../store/common'
// import ConsultationPage from '../../../../routes/consultation-page'
import './single-session.css'

function SingleSession(props) {
  const [showAlert, setShowAlert] = useState([])
  const {session_id, session_date, client_name, client_surname, client_email, session_descr, last_version} = props.session

  const inviteClick = () => {
    console.log('invite client')
    fetch(`${api_path}mailer.php?client_name=${client_name}&client_email=${client_email}&user_name=${props.user.name}`)
      .then(response => response.text())
      .then(data => {
        // console.log('mailer response ->', data)     // dev message, delete in prod
        // Здесь нужна проверка на ответ сервера - ok/не ok.
      })
      .catch(e => console.log('catch error =>', e))
  }

  const setSession = () => {
    props.setThisSession(session_id, last_version)
  }

  const closeClick = () => {
    fetch(`${api_path}sessions.php`, {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},
      body: `close=ok&user_name=${props.user.login}&session_id=${session_id}`
    })
      .then(response => response.text())
      .then(data => {
        if (data === 'CLOSE_SESSION') {
          props.getCurrentSessions()
          props.getLastSessions()
        } else {
          setShowAlert([
            'notification',
            'row',
            'alert_sessionsCloseError',
            () => setShowAlert([])
          ])
        }
      })
      .catch(e => console.log('catch error =>', e))
  }

  const deleteClick = () => {
    fetch(`${api_path}sessions.php`, {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},
      body: `delete=ok&user_name=${props.user.login}&session_id=${session_id}`
    })
      .then(response => response.text())
      .then(data => {
        if (data === 'DELETE_SESSION') {
          props.type === 'current_session'  && props.getCurrentSessions() 
          props.type === 'last_session'     && props.getLastSessions() 
        } else {
          setShowAlert([
            'notification',
            'row',
            'alert_sessionsDeleteError',
            () => setShowAlert([])
          ])
        }
      })
      .catch(e => console.log('catch error DELETE_SESSION =>', e))
  }

  let alert = showAlert.length > 0 ?
    <Alerts
      data = {{messageType: showAlert[0], direction: showAlert[1], text: showAlert[2]}}
      applyChanges = {showAlert[3]}
      discardChanges = {showAlert[4]}
    /> : ''

  console.log('render Single current session')

  return (
    <div className="sessions-item">
      <div className="sessions-item-left">
        <div className="sessions-item-caption">
          <span className="sessions-item-caption__1stelement no_wrap">
            {session_date}
          </span>
          <br/>
          <span className="sessions-item-caption__2ndelement no_wrap">
            {`${client_name} ${client_surname}`} 
          </span>
        </div>
        <div className="sessions-item-body">
          {session_descr}
        </div>
      </div>
      <div className="sessions-item-right">
        {props.type === 'current_session' ? 
          <button className="sessions-item-button" onClick={inviteClick}>Пригласить</button> : ''}
        {props.type === 'current_session' ? 
          <Link to={`./consultation`}><button className="sessions-item-button" onClick={setSession}>Войти</button></Link> : ''} {/* /${session_id} */}
        {props.type === 'current_session' ? 
          <button
            className="sessions-item-button"
            onClick={() => setShowAlert([
              'request',
              'row',
              'alert_sessionsClose',
              closeClick,
              () => setShowAlert([])
            ])}>
              Закрыть
            </button> : ''}  
        <button
          className="sessions-item-button"
          onClick={() => setShowAlert([
            'request',
            'row',
            'alert_sessionsDelete',
            deleteClick,
            () => setShowAlert([])
          ])}
        >
          Удалить
        </button>
        {alert}
      </div>
    </div>
  )
}

export default SingleSession


// Локальная проверка: Из базы удаляет и закрывает сессии корректно. Лишних рендеров и фетчей нет.

// 

// ТЕСТИТЬ НА ПРОДАКШНЕ ОТПРАВКУ ПОЧТЫ и добавить проверку и алерты в случае необходимости.
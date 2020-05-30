import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import Alerts from '../../../alerts'
import {api_path} from '../../../../store/common'
// import ConsultationPage from '../../../../routes/consultation-page'
import './single-session.css'

function SingleSession(props) {
  const [confirm, setConfirm] = useState([])
  const {session_id, session_date, client_name, client_surname, session_descr, last_version} = props.session

  const inviteClick = () => {
    console.log('invite client')
    fetch(`http://metaforia-react-side.leonovlab.ru/api/mailer.php`)
      .then(response => response.text())
      .then(data => {
        console.log('mailer response ->', data)
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
        if (data === 'DELETE_SESSION') {      // если другой ответ сервера - ничего не делаем
          props.type === 'current_session'  && props.getCurrentSessions() 
          props.type === 'last_session'     && props.getLastSessions() 
        }
      })
      .catch(e => console.log('catch error DELETE_SESSION =>', e))
  }

  let confirm_message = confirm.length === 2 ?
    <Alerts confirmText={confirm[0]} applyChanges={confirm[1]} discardChanges={() => setConfirm([])}/> : null

  console.log('render Single current session')

  return (
    <div className="sessions-item">
      <div className="sessions-item-left">
        <div className="sessions-item-caption">
          <span className="sessions-item-caption__1stelement no_wrap">
            {session_date}
          </span>
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
          <button className="sessions-item-button" onClick={() => setConfirm(['Закрыть сессию и перенести ее в архив', closeClick])}>Закрыть</button> : ''}  
        <button
          className="sessions-item-button"
          onClick={() => setConfirm(['Удалить сессию безвозвратно', deleteClick])}
        >
          Удалить
        </button>
        {confirm_message}
      </div>
    </div>
  )
}

export default SingleSession


// Из базы удаляет и закрывает сессии корректно. Лишних рендеров и фетчей нет.
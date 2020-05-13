import React from 'react'
import {api_path} from '../../../../store/common'
import './single-current-session.css'

function SingleCurrentSession(props) {
  const {session_id, session_date, client_name, client_surname, session_descr} = props.session

  const inviteClick = () => {
    console.log('invite client')
  }

  const openClick = () => {
    console.log('enter session')
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
          props.clearCurrentSessions()
          props.clearLastSessions()
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
      .then(data => (data === 'DELETE_SESSION') && props.clearCurrentSessions())
      .catch(e => console.log('catch error =>', e))
  }

  return (
    <div className="sessions-item">
      <div className="sessions-item-left">
        <div className="sessions-item-caption">
          <span className="sessions-item-caption__1stelement">
            {session_date}
          </span>
          <span className="sessions-item-caption__2ndelement">
            {`${client_name} ${client_surname}`} 
          </span>
        </div>
        <div className="sessions-item-body">
          {session_descr}
        </div>
      </div>
      <div className="sessions-item-right">
        <button className="sessions-item-button" onClick={inviteClick}>Пригласить</button>
        <button className="sessions-item-button" onClick={openClick}>Войти</button>
        <button className="sessions-item-button" onClick={closeClick}>Закрыть</button>
        <button className="sessions-item-button" onClick={deleteClick}>Удалить</button>
      </div>      
    </div>
  )
}

export default SingleCurrentSession
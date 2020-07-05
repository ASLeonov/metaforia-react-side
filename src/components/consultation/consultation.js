import React, {useState, useEffect} from 'react'
import ConsultationContent from '../consultation-content'
import Messages from '../messages'
import {connect} from 'react-redux'
import {selectUser} from '../../store/selectors/user'
import {selectThisSession} from '../../store/selectors/sessions'
import {clearThisSession, updateThisSession} from '../../store/action-creators/sessions-actions'
import {clearSelectedCardItems, getCardsThisSession} from '../../store/action-creators/cards-actions'
import {websocket_path} from '../../store/common'
import './consultation.css'

function Consultation(props) {
  const [data, setData] = useState(null)
  const [socket, setSocket] = useState(false)
  const {user, thisSession, clearThisSession, clearSelectedCardItems, updateThisSession, getCardsThisSession} = props

  const modificator = user.type  // Правильно ли ????? Скорее при инициализайии нет.
 
  useEffect( () => {
    if (thisSession.session_id) {
      const socket = new WebSocket(websocket_path)
      const send_data = {
        user:        user.login,
        session:     thisSession.session_id,
        modificator: modificator
      }
      socket.onopen = e => socket.send(JSON.stringify(send_data))
      setData(<ConsultationContent session_id={thisSession.session_id} />)
      setSocket(socket)
        return () => {
          socket.close(1000, "finished socket connection by unMount target component")
        }
    } else {
      setData(<Messages caption="message_currentSessionError" />)
    }
    // eslint-disable-next-line
  }, [])

  useEffect( () => {
    if (socket) {
      socket.onmessage = e => {
        const get_data = JSON.parse(e.data)
        if ( (String(thisSession.last_version) !== String(get_data.last_version)) || 
             (String(thisSession.last_version) === String(get_data.last_version) && modificator !== get_data.last_modificator) ) {
                console.log('current version -> bad')
                updateThisSession(get_data.last_version)
                getCardsThisSession()
        } else {
          console.log('current version -> ok ->',  String(thisSession.last_version), '===', String(get_data.last_version))
        }
      }
    }
    // eslint-disable-next-line
  }, [socket, thisSession.last_version])

  useEffect ( () => () => {
    clearThisSession()
    clearSelectedCardItems()
    // eslint-disable-next-line
  }, [])

  console.log('render Consultation')

  return (
    <>
      {data}
    </>
  )
}

export default connect(
  state => ({
    user:        selectUser(state),
    thisSession: selectThisSession(state)
  }),
  {
    clearThisSession, clearSelectedCardItems, updateThisSession, getCardsThisSession
  }
)(Consultation)

// ПРОВЕРЕНО ЛОКАЛЬНО.

// Корректная работа.
// Это верхний компонент консультаций. В нем  проверяем, есть ли выбранная текущая сессия для работы. Если есть - грузим дальше, если нет - message.
// Также при unMount сессии чистим store у текущей сессии (clearThisSession) и карты выбранных колод (clearSelectedCardItems) и установленные в <ConsultationCards /> таймеры.
// Лишних рендеров нет, фетчей совсем нет.


// Добавляю сюда стейт с сокетом cокет - после этого ничего не проверял !!!!!!!!!!
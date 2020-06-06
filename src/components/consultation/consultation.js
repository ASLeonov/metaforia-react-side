import React, {useEffect} from 'react'
import ConsultationContent from '../consultation-content'
import Messages from '../messages'
import {connect} from 'react-redux'
import {selectThisSession} from '../../store/selectors/sessions'
import {clearThisSession} from '../../store/action-creators/sessions-actions'
import {clearSelectedCardItems} from '../../store/action-creators/cards-actions'
import './consultation.css'

// import useWebSocket from 'react-use-websocket'

function Consultation(props) {
  const {clearThisSession, clearSelectedCardItems} = props

  // const {sendMessage, sendJsonMessage, lastMessage, lastJsonMessage, readyState, getWebSocket} = 
  //   useWebSocket('ws://localhost/ll/socket.php', {                                // wss://echo.websocket.org
  //     onOpen: () => console.log('opened'),
  //     shouldReconnect: (closeEvent) => false,
  //   })

  const data = props.thisSession.session_id ? 
    <ConsultationContent session_id={props.thisSession.session_id} /> : 
      <Messages caption="message_currentSessionError" />

  useEffect ( () => () => {
    const maxId = setInterval( () => {} )
    for (let i=0; i < maxId; i+=1) { 
      clearInterval(i)
    }
    clearThisSession()
    clearSelectedCardItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log('render Consultation')

  return (
    <>
    {/* <button onClick={() => sendMessage('msg')}>MSG</button> */}
    {data}</>
  )
}

export default connect(
  state => ({
    thisSession: selectThisSession(state)
  }),
  {
    clearThisSession, clearSelectedCardItems
  }
)(Consultation)

// ПРОВЕРЕНО ЛОКАЛЬНО.

// Корректная работа.
// Это верхний компонент консультаций. В нем  проверяем, есть ли выбранная текущая сессия для работы. Если есть - грузим дальше, если нет - message.
// Также при unMount сессии чистим store у текущей сессии (clearThisSession) и карты выбранных колод (clearSelectedCardItems) и установленные в <ConsultationCards /> таймеры.
// Лишних рендеров нет, фетчей совсем нет.


// Добавляю сюда стейт с сокетом cокет - после этого ничего не проверял !!!!!!!!!!
import React, {useEffect} from 'react'
import ConsultationContent from '../consultation-content'
import Messages from '../messages'
import {connect} from 'react-redux'
import {selectThisSession} from '../../store/selectors/sessions'
import {clearThisSession} from '../../store/action-creators/sessions-actions'
import {clearSelectedCardItems} from '../../store/action-creators/cards-actions'
import './consultation.css'

function Consultation(props) {
  const data = props.thisSession.session_id ? 
    <ConsultationContent /> : 
      <Messages caption="message_currentSessionError" />

  useEffect ( () => () => {   // '() => () => ' - сработает только при unMount
    const maxId = setInterval( () => {} )
    for (let i=0; i < maxId; i+=1) { 
      clearInterval(i)
    }
    props.clearThisSession()
    props.clearSelectedCardItems()
  }, [])

  console.log('render Consultation')

  return (
    <>{data}</>
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

// БАГ. Если зайти на страницу напрямую, не через текущие сессии, то при переходе по ссылке в сообщении на текущие сессии вылазит Warning: Cannot update a component (`ConnectFunction`) while rendering a different component (`CurrentSessions`)...........
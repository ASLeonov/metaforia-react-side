import React, {useEffect} from 'react'
import ConsultationContent from '../consultation-content'
import Messages from '../messages'
import {connect} from 'react-redux'
import {selectThisSession} from '../../store/selectors/sessions'
import {clearThisSession} from '../../store/action-creators/sessions-actions'
import {clearSelectedCardItems} from '../../store/action-creators/cards-actions'
import './consultation.css'

function Consultation(props) {
  const {clearThisSession, clearSelectedCardItems} = props

  const data = props.thisSession.session_id ? 
    <ConsultationContent /> : 
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

// ПРОВЕРЕНО ЛОКАЛЬНО.

// Корректная работа.
// Это верхний компонент консультаций. В нем  проверяем, есть ли выбранная текущая сессия для работы. Если есть - грузим дальше, если нет - message.
// Также при unMount сессии чистим store у текущей сессии (clearThisSession) и карты выбранных колод (clearSelectedCardItems) и установленные в <ConsultationCards /> таймеры.
// Лишних рендеров нет, фетчей совсем нет.
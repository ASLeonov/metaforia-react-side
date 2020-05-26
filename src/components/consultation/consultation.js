import React, {useEffect} from 'react'
import ConsultationContent from '../consultation-content'
import Messages from '../messages'
import {connect} from 'react-redux'
import {selectThisSession} from '../../store/selectors/sessions'
import {clearThisSession} from '../../store/action-creators/sessions-actions'
import {clearSelectedCardItems, clearCardsThisSession, clearCardThisSessionLocal} from '../../store/action-creators/cards-actions'
import './consultation.css'

function Consultation(props) {
  const data = props.thisSession.session_id ? 
    <ConsultationContent /> : 
      <Messages caption="message_currentSessionError" />

  useEffect ( () => () => {   // Такая форма записи useEffect => сработает только при unMount
    const maxId = setInterval( () => {} )
    for (let i=0; i < maxId; i+=1) { 
      clearInterval(i)
    }
    props.clearThisSession()
    props.clearCardsThisSession()
    props.clearSelectedCardItems()
    props.clearCardThisSessionLocal()
  }, [])

  return (
    <>{data}</>
  )
}

export default connect(
  state => {
    return {
      thisSession: selectThisSession(state)
    }
  },
  {
    clearThisSession, clearSelectedCardItems, clearCardsThisSession, clearCardThisSessionLocal
  }
)(Consultation)
import React from 'react'
import ConsultationContent from '../consultation-content'
import Messages from '../messages'
import {connect} from 'react-redux'
import {selectThisSession} from '../../store/selectors/sessions'
import './consultation.css'

function Consultation(props) {

  const data = props.thisSession.session_id ? 
    <ConsultationContent /> : 
      <Messages caption="message_currentSessionError" />

  return (
    <>
      {data}
    </>
  )

}

export default connect(
  state => {
    return {
      thisSession: selectThisSession(state)
    }
  },
  null
)(Consultation)
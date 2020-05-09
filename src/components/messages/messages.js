import React from 'react'
import {Link} from 'react-router-dom'
import {messages} from '../../store/messages'
import './messages.css'

function Messages(props) {

  const text_line_1 = messages[props.caption][0]
  const text_line_2 = messages[props.caption][2] ? 
    <Link to={messages[props.caption][2]} className="messages_link">{messages[props.caption][1]}</Link> : 
      messages[props.caption][1]

  return (
    <p className="messages">
      <span>{text_line_1}</span>
      <span>{text_line_2}</span>
    </p>
  )
  
}

export default Messages
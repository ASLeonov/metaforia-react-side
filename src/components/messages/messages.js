import React from 'react'
import {messages} from '../../store/messages'
import './messages.css'

function Messages(props) {

  const text_line_1 = messages[props.caption][0]
  const text_line_2 = messages[props.caption][1]
  // const text_line_2 = props.err.message

  return (
    <p className="messages">
      <span>{text_line_1}</span>
      <span>{text_line_2}</span>
    </p>
  )
  
}

export default Messages
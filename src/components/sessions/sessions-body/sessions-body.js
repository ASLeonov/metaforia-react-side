import React from 'react'
import CurrentSessions from './current-sessions'
import LastSessions from './last-sessions'
import './sessions-body.css'
// import {useState} from 'react'

function SessionsBody(props) {

  const {activeSessionsTab} = props

  let currentData = ''

  switch (activeSessionsTab) {
    case 'currentSessions':
      currentData = <CurrentSessions />
      break;
    case 'lastSessions':
      currentData = <LastSessions />
      break;
    default:
      currentData = <CurrentSessions />
      break;
  }

  return (
      <div className="content-sessions-body">
        {currentData}
      </div>
  )
}

export default SessionsBody
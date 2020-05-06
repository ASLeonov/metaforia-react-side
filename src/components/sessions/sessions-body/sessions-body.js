import React from 'react'
import CurrentSessions from './current-sessions'
import LastSessions from './last-sessions'
import './sessions-body.css'

function SessionsBody(props) {

  let currentData = ''

  switch (props.activeSessionsTab) {
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

  console.log('render Sessions Body')

  return (
      <div className="content-sessions-body">
        {currentData}
      </div>
  )
  
}

export default SessionsBody
import React from 'react'
import SessionsCaption from './sessions-caption'
import SessionsBody from './sessions-body'
import {useState} from 'react'
// import './sidebar.css'

function Sessions() {

  const [activeSessionsTab, setActiveSessionsTab] = useState('currentSessions')

  const changeActiveSession = newSessionTab => {
    setActiveSessionsTab(newSessionTab)
  }

  return (
      <div className="content-sessions">
        <SessionsCaption
          activeSessionsTab={activeSessionsTab}
          changeActiveSession={changeActiveSession}
        />
        <SessionsBody
          activeSessionsTab={activeSessionsTab}
          changeActiveSession={changeActiveSession}
        />
      </div>
  )
}

export default Sessions
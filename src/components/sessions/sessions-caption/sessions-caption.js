import React from 'react'
import './sessions-caption.css'

function SessionsCaption(props) {

  const {activeSessionsTab, changeActiveSession} = props

  const onHandleClick = event => {
    const currentTarget = event.target.attributes.targetsessionlink.value
      if (currentTarget !== activeSessionsTab)
        changeActiveSession(currentTarget)
  }

  const classNameDefault = "content-sessions-caption__title"

  return (
    <div className="content-sessions-caption">
      <span
        className={activeSessionsTab === 'currentSessions' ? `${classNameDefault} content-sessions-caption__title___active` : classNameDefault}
        onClick={onHandleClick}
        targetsessionlink="currentSessions"
      >
        Текущие сессии
      </span>
      <span
        className={activeSessionsTab === 'lastSessions' ? `${classNameDefault} content-sessions-caption__title___active` : classNameDefault}
        onClick={onHandleClick}
        targetsessionlink="lastSessions"
      >
        Прошедшие сессии
      </span>
    </div>
  )

}

export default SessionsCaption
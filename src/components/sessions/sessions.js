import React from 'react'
import SessionsCaption from './sessions-caption'
import SessionsBody from './sessions-body'

function Sessions(props) {

console.log('render Sessions')

  return (
    <div className="content-sessions">
      <SessionsCaption />
      <SessionsBody activeSessionsTab={props.activeSessionsTab} />
    </div>
  )
  
}

export default Sessions
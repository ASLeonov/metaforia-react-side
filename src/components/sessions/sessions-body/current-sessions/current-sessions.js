import React from 'react'
import {connect} from 'react-redux'
import {getCurrentSessions, clearCurrentSessions, clearLastSessions} from '../../../../store/action-creators'
import {selectCurrentSessions} from '../../../../store/selectors/sessions'
import {selectUser} from '../../../../store/selectors'
import SingleCurrentSession from '../single-current-session'
import Messages from '../../../messages'
import Loader from '../../../loader'
import './current-sessions.css'

function CurrentSessions(props) {
  const {sessions_data, getCurrentSessions, clearCurrentSessions, clearLastSessions, user} = props
  let fetched

  if (!sessions_data.isLoading && !sessions_data.isLoaded) {
    getCurrentSessions()
  }

  if (sessions_data.isLoading) {
    fetched = <Loader />
  }

  if (sessions_data.isLoaded) {
    if (sessions_data.data[0] !== "ERROR") {
      if (sessions_data.data.length > 0) {
        fetched = sessions_data.data.map( element => (
          <SingleCurrentSession
            key={element.session_id}
            session={element}
            user={user}
            clearCurrentSessions={clearCurrentSessions} 
            clearLastSessions={clearLastSessions}
          />
        ))
      } else {
        fetched = <Messages caption="message_currentSessionsNone" />
      }
    } else {
      fetched = <Messages caption="message_currentSessionsError" />
    }
  }

  const reload = () => clearCurrentSessions()

  return (
    <div className="sessions-list">
      {fetched}
      {/* <button onClick={reload}>Обновить список сессий</button> */}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    sessions_data: selectCurrentSessions(state),
    user: selectUser(state)
  }
}

const mapDispatchToProps = {
  getCurrentSessions: getCurrentSessions,
  clearCurrentSessions: clearCurrentSessions,
  clearLastSessions: clearLastSessions
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentSessions)
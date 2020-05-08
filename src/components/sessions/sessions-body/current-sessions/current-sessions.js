import React from 'react'
import {connect} from 'react-redux'
import {getCurrentSessions} from '../../../../store/action-creators'
import {selectCurrentSessions, selectCurrentSessionsJSX} from '../../../../store/selectors/sessions'
import Messages from '../../../messages'
import Loader from '../../../loader'
import './current-sessions.css'

function CurrentSessions(props) {
  const {sessions_data, sessionsJSX, getCurrentSessions} = props
  let fetched

  if (!sessions_data.isLoaded) {
    fetched = <Loader />
    getCurrentSessions()
  } else if (sessions_data.data[0] !== "ERROR") {
    fetched = sessionsJSX
  } else {
    fetched = <Messages caption="message_currentSessionsError" />
  }

  return (
    <div>
      {fetched}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    sessions_data: selectCurrentSessions(state),
    sessionsJSX: selectCurrentSessionsJSX(state)
  }
}

const mapDispatchToProps = {
  getCurrentSessions: getCurrentSessions
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentSessions)
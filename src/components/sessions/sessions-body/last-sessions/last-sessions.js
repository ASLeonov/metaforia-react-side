import React from 'react'
import {connect} from 'react-redux'
import {getLastSessions} from '../../../../store/action-creators'
import {selectLastSessions, selectLastSessionsJSX} from '../../../../store/selectors/sessions'
import Messages from '../../../messages'
import Loader from '../../../loader'

function LastSessions(props) {
  const {sessions_data, sessionsJSX, getLastSessions} = props
  let fetched

  if (!sessions_data.isLoading && !sessions_data.isLoaded) {
    getLastSessions()
  }

  if (sessions_data.isLoading) {
    fetched = <Loader />
  }

  if (sessions_data.isLoaded) {
    if (sessions_data.data[0] !== "ERROR") {
      if (sessions_data.data.length > 0) {
        fetched = sessionsJSX
        // fetched = sessions_data.data.map( element => (
        //   <SingleCurrentSession
        //     key={element.session_id}
        //     session={element}
        //     user={user}
        //     clearCurrentSessions={clearCurrentSessions} 
        //     clearLastSessions={clearLastSessions} 
        //   />
        // ))
      } else {
        fetched = <Messages caption="message_lastSessionsNone" />
      }
    } else {
      fetched = <Messages caption="message_lastSessionsError" />
    }
  }

  // if (!sessions_data.isLoaded) {
  //   fetched = <Loader />
  //   // getLastSessions()
  // } else if (sessions_data.data[0] !== "ERROR") {
  //   fetched = sessionsJSX
  // } else {
  //   fetched = <Messages caption="message_lastSessionsError"/>
  // }

  return (
    <div>
      {fetched}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    sessions_data: selectLastSessions(state),
    sessionsJSX: selectLastSessionsJSX(state)
  }
}

const mapDispatchToProps = {
  getLastSessions: getLastSessions
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LastSessions)
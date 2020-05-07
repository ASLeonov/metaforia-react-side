import React from 'react'
import {connect} from 'react-redux'
import {getCurrentSessions} from '../../../../store/action-creators'
import {selectCurrentSessions, selectCurrentSessionsData} from '../../../../store/selectors'
import {select} from '../../../../store/selectors'
import './current-sessions.css'

function CurrentSessions(props) {
  const {sessions_data, getCurrentSessions} = props
  let fetched = []

  if (!sessions_data.isLoaded) {
    fetched.push(<div key="loading-current-sessions">Загрузка...</div>)
    getCurrentSessions()
  } else if (sessions_data.data[0] !== "ERROR") {
    fetched = props.sessionsJSX
    // fetched = sessions_data.data.map(element => {
    //   console.log('calc data arr')
    //     return (
    //       <div className="sessions-item" key={element.session_id}>
    //         <div className="sessions-item-caption">
    //           <span className="sessions-item-caption__1stelement">
    //             {element.session_date}
    //           </span>
    //           <span className="sessions-item-caption__2ndelement">
    //             {`${element.client_name} ${element.client_surname}`} 
    //           </span>
    //         </div>
    //         <div className="sessions-item-body">
    //           {element.session_descr}
    //         </div>
    //       </div>
    //     )
    // })
  } else {
    fetched.push(<div key="error-current-sessions">Произошла ошибка загрузки...</div>)
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
    sessionsJSX: selectCurrentSessionsData(state)
  }
}

const mapDispatchToProps = {
  getCurrentSessions: getCurrentSessions
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentSessions)
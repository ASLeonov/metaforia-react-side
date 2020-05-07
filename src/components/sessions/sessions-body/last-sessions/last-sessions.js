import React from 'react'
import {connect} from 'react-redux'
import {getLastSessions} from '../../../../store/action-creators'
import {selectLastSessions} from '../../../../store/selectors'

function LastSessions(props) {
  const {sessions_data, getLastSessions} = props
  const fetched = []

  if (!sessions_data.isLoaded) {
    fetched.push(<div key="loading-last-sessions">Загрузка...</div>)
    getLastSessions()
  } else if (sessions_data.data[0] !== "ERROR") {
    sessions_data.data.forEach(element => {
      fetched.push(
        <div className="sessions-item" key={element.session_id}>
          <div className="sessions-item-caption">
            <span className="sessions-item-caption__1stelement">
              {element.session_date}
            </span>
            <span className="sessions-item-caption__2ndelement">
              {`${element.client_name} ${element.client_surname}`} 
            </span>
          </div>
          <div className="sessions-item-body">
            {element.session_descr}
          </div>
        </div>
      )
    })
  } else {
    fetched.push(<div key="error-last-sessions">Произошла ошибка загрузки...</div>)
  }

  return (
    <div>
      {fetched}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    sessions_data: selectLastSessions(state)
  }
}

const mapDispatchToProps = {
  getLastSessions: getLastSessions
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LastSessions)
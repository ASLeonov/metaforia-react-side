import React from 'react'
import {connect} from 'react-redux'
import {logout} from '../../../store/action-creators/user-actions'
import './exit.css'

function Exit({logout}) {

  const logoutClick = () => {
    delete localStorage.token
    logout()
  }

  return (
    <div className="header-exit">
      <p className="header-exit-btn" onClick={logoutClick}>
        Выход
      </p>
    </div>
  )
}

export default connect(
  null,
  {
    logout
  }
)(Exit)
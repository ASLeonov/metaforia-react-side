import React from 'react'
import {connect} from 'react-redux'
import {selectUser} from '../../../store/selectors/user'
import './user.css'

function User({user}) {

  // console.log('render User', user)

  return (
    <div className="header-user">
      <div className="header-user-avatar"></div>
      <div>
        {user.fullname ? user.fullname : 'Авторизация не произведена'}
      </div>
    </div>
  )
}

export default connect(
  state => ({
    user: selectUser(state)
  })
)(User)
import React from 'react'
import {connect} from 'react-redux'
import {getUser} from '../../../store/action-creators/index'
import {selectUser} from '../../../store/selectors'
import './user.css'

function User({user, getUser}) {

  if (user.login === "") {
    getUser()
  }

  // console.log('render User', user)

  return (
    <div className="header-user">
      <div className="header-user-avatar"></div>
      <div>
        {user.name.length > 0 ? user.name : 'Текущий пользователь'}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  user: selectUser(state)
})

const mapDispatchToProps = {
  getUser: getUser
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User)
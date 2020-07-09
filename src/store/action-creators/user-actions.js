export const login = (user_login, user_password) => (dispatch, getState) => {
  const send_data = {
    login: 'ok',
    user_login,
    user_password
  }
  fetch(`/api/login`, {
    method: 'POST',
    headers: {'Content-Type':'application/json; charset=UTF-8'},
    body: JSON.stringify(send_data)
  })
    .then(res => res.json())
    .then(res => {
      if (!res.login_failed) {
        dispatch({
          type: 'LOGIN_OK',
          response: res,
        })
      } else {
        dispatch({
          type: 'LOGIN_ERROR',
          response: res,
        })
      }
    })
    .catch(error => {
      dispatch({
        type: 'LOGIN_ERROR'
      })
    })
}

export const login_token = token => (dispatch, getState) => {
  fetch(`/api/login`, {
    method: 'POST',
    headers: {'Content-Type':'application/json; charset=UTF-8'},
    body: JSON.stringify({user_token: token})
  })
    .then(res => res.json())
    .then(res => {
      if (res.login_failed) {
        dispatch({
          type: 'LOGIN_ERROR',
          response: res,
        })

      } else if (res.update_token) {
        dispatch({
          type: 'UPDATE_TOKEN',
          response: res,
        })
      } else {
        dispatch({
          type: 'LOGIN_TOKEN_OK',
          response: res,
        })
      }
    })
    .catch(error => {
      dispatch({
        type: 'LOGIN_ERROR'
      })
    })
}

export const logout = () => (dispatch, getstate) => {
  dispatch({
    type: 'LOGOUT'
  })
  dispatch({
    type: 'CLEAR_CONTACTS'
  })
  dispatch({
    type: 'CLEAR_SESSIONS_CURRENT'
  })
  dispatch({
    type: 'CLEAR_SESSIONS_LAST'
  })
  dispatch({
    type: 'CLEAR_CARDS_PAY'
  })
  dispatch({
    type: 'CLEAR_THIS_SESSION'
  })
  dispatch({
    type: 'CLEAR_USER_CARDS'
  })
  dispatch({
    type: 'CLEAR_SELECTED_CARD_ITEMS'
  })
}
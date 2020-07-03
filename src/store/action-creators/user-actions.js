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
    .then(res =>
      dispatch({
        type: 'LOGIN_OK',
        response: res,
      })
    )
    .catch(error => {
      console.log(error)
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
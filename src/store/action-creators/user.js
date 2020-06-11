import {api_path} from '../common'

export const login = user_login => (dispatch, getState) => {
  fetch(`${api_path}login.php`, {
    method: 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},
    body: `login=ok&user_login=${user_login}`
  })
    .then(res => res.json())
    .then(res =>
      dispatch({
        type: 'LOGIN_OK',
        response: res[0],
      })
    )
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
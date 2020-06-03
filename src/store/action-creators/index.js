import {api_path} from '../common'

export const getUser = () => {
  return {
      type: 'GET_USER',
  }
}

export const getContacts = () => (dispatch, getState) => {
  const user_login = getState().user.login
  dispatch({
    type: 'GET_CONTACTS__LOADING'
  })
  fetch(`${api_path}clients.php?${user_login}`)
    .then(res => res.json())
    .then(res =>
      dispatch({
        type: 'GET_CONTACTS__SUCCESS',
        response: res,
      })
    )
    .catch(error => {
      dispatch({
        type: 'GET_CONTACTS__FAILED',
        error,
      })
    })
}
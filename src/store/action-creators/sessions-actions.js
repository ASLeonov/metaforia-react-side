import {api_path} from '../common'

export const getCurrentSessions = () => (dispatch, getState) => {
  const user_login = getState().user.login
    dispatch({
      type: 'GET_SESSIONS_CURRENT__LOADING'
    })
    fetch(`${api_path}sessions.php?name=${user_login}&type=currentSessions`)
    // fetch(`/api/currentsessions?user_name=${user_login}`)
    .then(res => res.json())
    .then(res =>
      dispatch({
        type: 'GET_SESSIONS_CURRENT__SUCCESS',
        response: res,
      })
    )
    .catch(error => {
      dispatch({
        type: 'GET_SESSIONS_CURRENT__FAILED',
        error,
      })
    })
}

export const getLastSessions = () => (dispatch, getState) => {
  const user_login = getState().user.login
  dispatch({
    type: 'GET_SESSIONS_LAST__LOADING'
  })
  fetch(`${api_path}sessions.php?name=${user_login}&type=lastSessions`)
    .then(res => res.json())
    .then(res =>
      dispatch({
        type: 'GET_SESSIONS_LAST__SUCCESS',
        response: res,
      })
    )
    .catch(error => {
      dispatch({
        type: 'GET_SESSIONS_LAST__FAILED',
        error,
      })
    })
}




export const setThisSession = (session_id, last_version) => {
  return {
    type: 'SET_THIS_SESSION',
    payload: {
      session_id,
      last_version
    }
  }
}

export const clearThisSession = () => {
  return {
    type: 'CLEAR_THIS_SESSION',
  }
}
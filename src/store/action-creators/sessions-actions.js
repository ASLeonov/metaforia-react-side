export const getCurrentSessions = () => (dispatch, getState) => {
  const user_login = getState().user.login
  const user_type  = getState().user.type
    dispatch({
      type: 'GET_SESSIONS_CURRENT__LOADING'
    })
    fetch(`/api/currentsessions?user_login=${user_login}&user_type=${user_type}`)
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
  const user_type  = getState().user.type
  dispatch({
    type: 'GET_SESSIONS_LAST__LOADING'
  })
  fetch(`/api/lastsessions?user_login=${user_login}&user_type=${user_type}`)
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

export const updateThisSession = last_version => {
  return {
    type: 'UPDATE_LAST_VERSION_THIS_SESSION',
    payload: {
      last_version
    }
  }
}

export const clearThisSession = () => {
  return {
    type: 'CLEAR_THIS_SESSION',
  }
}
export const getCurrentSessions = () => (dispatch, getState) => {
  const user_login = getState().user.login
  const user_type  = getState().user.type
  const user_tools = getState().user.tools
    dispatch({
      type: 'GET_SESSIONS_CURRENT__LOADING'
    })
    fetch(`/api/currentsessions?user_login=${user_login}&user_type=${user_type}&user_tools=${user_tools}`)
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
  const user_tools = getState().user.tools
  dispatch({
    type: 'GET_SESSIONS_LAST__LOADING'
  })
  fetch(`/api/lastsessions?user_login=${user_login}&user_type=${user_type}&user_tools=${user_tools}`)
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




export const setThisSession = (session_id, last_version, last_modificator, cards_side) => {
  return {
    type: 'SET_THIS_SESSION',
    payload: {
      session_id,
      cards_side,
      last_version,
      last_modificator
    }
  }
}

export const updateThisSession = (last_version, last_modificator) => {
  return {
    type: 'UPDATE_LAST_VERSION_THIS_SESSION',
    payload: {
      last_version,
      last_modificator, 

    }
  }
}

export const clearThisSession = () => {
  return {
    type: 'CLEAR_THIS_SESSION',
  }
}
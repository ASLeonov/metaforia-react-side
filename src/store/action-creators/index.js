import {api_path} from '../common'

export const getUser = () => {
  return {
      type: 'GET_USER',
      // callApi: `${api_path}`,
  }
}

export const getCurrentSessions = () => (dispatch, getState) => {
  const user_login = getState().user.login
  setTimeout( () => {
    fetch(`${api_path}sessions.php?name=${user_login}&type=currentSessions`)
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
  }, 3000)
}

export const getLastSessions = () => (dispatch, getState) => {
  const user_login = getState().user.login
  setTimeout( () => {
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
  }, 2000)
}

export const getFreeCards = () => (dispatch, getState) => {
  const user_login = getState().user.login
  setTimeout( () => {
    fetch(`${api_path}cards.php?name=${user_login}&type=freeCards`)
    .then(res => res.json())
    .then(res =>
      dispatch({
        type: 'GET_CARDS_FREE__SUCCESS',
        response: res,
      })
    )
    .catch(error => {
      dispatch({
        type: 'GET_CARDS_FREE__FAILED',
        error,
      })
    })
  }, 3000)
}

export const getPayCards = () => (dispatch, getState) => {
  const user_login = getState().user.login
  setTimeout( () => {
    fetch(`${api_path}cards.php?name=${user_login}&type=payCards`)
    .then(res => res.json())
    .then(res =>
      dispatch({
        type: 'GET_CARDS_PAY__SUCCESS',
        response: res,
      })
    )
    .catch(error => {
      dispatch({
        type: 'GET_CARDS_PAY__FAILED',
        error,
      })
    })
  }, 3000)
}

export const getContacts = () => (dispatch, getState) => {
  const user_login = getState().user.login
  setTimeout( () => {
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
  }, 3000)
}


// export const addPlayerScore = () => {
//     return {
//         type: 'INCREMENT_PLAYER_SCORE',
//     }
// }

// export const addBotScore = () => {
//     return {
//         type: 'INCREMENT_BOT_SCORE',
//     }
// }

// export const clearScores = () => {
//     return {
//         type: 'CLEAR_SCORES',
//     }
// }

// export const getSessions = () => {
//     return {
//         type: 'GET_SESSIONS',
//         callApi: `${api_path}`,
//     }

// }
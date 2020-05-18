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
    dispatch({
      type: 'GET_SESSIONS_CURRENT__LOADING'
    })
  })
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
  }, 1000)
}

export const clearCurrentSessions = () => (dispatch, getState) => {
  dispatch({
    type: 'CLEAR_SESSIONS_CURRENT',
  })
}

export const getLastSessions = () => (dispatch, getState) => {
  const user_login = getState().user.login
  setTimeout( () => {
    dispatch({
      type: 'GET_SESSIONS_LAST__LOADING'
    })
  })
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

export const clearLastSessions = () => (dispatch, getState) => {
  dispatch({
    type: 'CLEAR_SESSIONS_LAST',
  })
}

export const saveCardThisSession = (cards_id, card, position_left, position_top) => {
  return {
    type: 'SAVE_CARD_THIS_SESSION',
    payload: {
      cards_id: cards_id,
      card: card,
      position_left: position_left,
      position_top: position_top
    }
    // callApi: `${api_path}`,
}
}

// export const getFreeCards = () => (dispatch, getState) => {
//   const user_login = getState().user.login
//   setTimeout( () => {
//     fetch(`${api_path}cards.php?name=${user_login}&type=freeCards`)
//     .then(res => res.json())
//     .then(res =>
//       dispatch({
//         type: 'GET_CARDS_FREE__SUCCESS',
//         response: res,
//       })
//     )
//     .catch(error => {
//       dispatch({
//         type: 'GET_CARDS_FREE__FAILED',
//         error,
//       })
//     })
//   }, 3000)
// }

export const getPayCards = () => (dispatch, getState) => {
  const user_login = getState().user.login
  setTimeout( () => {
    dispatch({
      type: 'GET_CARDS_PAY__LOADING'
    })
  })
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

export const getUserCards = () => (dispatch, getState) => {
  const user_login = getState().user.login
  setTimeout( () => {
    dispatch({
      type: 'GET_USER_CARDS__LOADING'
    })
  })
  setTimeout( () => {
    fetch(`${api_path}cards.php?name=${user_login}&type=userPayCards`)
    .then(res => res.json())
    .then(res =>
      dispatch({
        type: 'GET_USER_CARDS__SUCCESS',
        response: res,
      })
    )
    .catch(error => {
      // console.log(error)
      dispatch({
        type: 'GET_USER_CARDS__FAILED',
        error,
      })
    })
  }, 700)
}

export const getSelectedCardItems = (cards_id) => (dispatch, getState) => {
  setTimeout( () => {
    dispatch({
      type: 'GET_SELECTED_CARD_ITEMS__LOADING'
    })
  })
  setTimeout( () => {
    fetch(`${api_path}cards.php?name=user&type=userSelectedCards&payload=${cards_id}`)
    .then(res => res.json())
    .then(res =>
      dispatch({
        type: 'GET_SELECTED_CARD_ITEMS__SUCCESS',
        response: res,
      })
    )
    .catch(error => {
      dispatch({
        type: 'GET_SELECTED_CARD_ITEMS__FAILED',
        error,
      })
    })
  }, 700)
}

export const addSelectedCardItems = (cardsBox_id) => (dispatch) => {
  setTimeout( () => {
    dispatch({
      type: 'ADD_SELECTED_CARD_ITEMS',
      payload: {
        cardsBox_id: cardsBox_id
      }
    })
  })
}

export const setCardInUse = (cards_id) => (dispatch) => {
  setTimeout( () => {
    dispatch({
      type: 'SET_IN_USE_SELECTED_CARD_ITEMS',
      payload: {
        cards_id: cards_id
      }
    })
  })
}





export const getContacts = () => (dispatch, getState) => {
  const user_login = getState().user.login

  setTimeout( () => {   // фиксил непонятный баг
    dispatch({
      type: 'GET_CONTACTS__LOADING'
    })
  })

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
  }, 1000)
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
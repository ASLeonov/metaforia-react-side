import {api_path} from '../common'

export const getUser = () => {
  return {
      type: 'GET_USER',
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
  })
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
      dispatch({
        type: 'GET_USER_CARDS__FAILED',
        error,
      })
    })
  })
}

// export const setCardInUse = (cards_id) => (dispatch) => {
//   setTimeout( () => {
//     dispatch({
//       type: 'SET_IN_USE_SELECTED_CARD_ITEMS',
//       payload: {
//         cards_id: cards_id
//       }
//     })
//   })
// }

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
  })
}


// export const addPlayerScore = () => {
//     return {
//         type: 'INCREMENT_PLAYER_SCORE',
//     }
// }

// export const getSessions = () => {
//     return {
//         type: 'GET_SESSIONS',
//         callApi: `${api_path}`,
//     }

// }
import {api_path} from '../common'

// ----------

export const getCardsThisSession = () => (dispatch, getState) => {
  const user_login = getState().user.login
  const session_id = getState().thisSession.session_id
  setTimeout( () => {
    dispatch({
      type: 'GET_CARDS_THIS_SESSIONS__LOADING'
    })
  })
  setTimeout( () => {
    fetch(`${api_path}cards.php?name=${user_login}&type=getCardsThisSessions&session_id=${session_id}`)
    .then(res => res.json())
    .then(res =>
      dispatch({
        type: 'GET_CARDS_THIS_SESSIONS__SUCCESS',
        response: res,
      })
    )
    .catch(error => {
      dispatch({
        type: 'GET_CARDS_THIS_SESSIONS__FAILED',
        error,
      })
    })
  })
}

export const clearCardsThisSession = () => {
  return {
    type: 'CLEAR_CARDS_THIS_SESSION'
  }
}


// ----------

export const saveCardThisSession = (card, position_left, position_top, scale, session_id) => (dispatch, getState) => {
  const user_login = getState().user.login
  fetch(`${api_path}cards.php`, {
    method: 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},
    body: `saveCardThisSession=ok&name=${user_login}&session_id=${session_id}&cards_id=${card.cards_id}&cards_name=${card.cards_name}&cards_img=${card.cards_img}&position_left=${position_left}&position_top=${position_top}&scale=${scale}`
  })
    .then(response => response.text())
    .then(data => {
      if (data === 'INSERT_CARD_THIS_SESSION') {
        dispatch({
          type: 'INCREASE_THIS_SESSION',
          payload: {
            card,
            position_left,
            position_top,
            scale
          }
        })
        // console.log('Card', card.cards_id ,'added/updated successfull')
        // задиспатчить экшн на получение данных от бэка когда надо
        // dispatch({
        //   type: '...'
        // })
      } else {
        console.log('php ->', data)
      }
    })
    .catch(e => console.log('catch error =>', e))
}

export const saveCardThisSessionLocal = (card, position_left, position_top, scale) => {
  return {
    type: 'SAVE_CARD_THIS_SESSION_LOCAL',
    payload: {
      card,
      position_left,
      position_top,
      scale
    }
  }
}

export const clearCardThisSessionLocal = (card, position_left, position_top, scale) => {
  return {
    type: 'CLEAR_CARD_THIS_SESSION_LOCAL'
  }
}


// ---------- SELECTED CARD ITEMS Карты из выбранной для работы колоды ---------- //

export const getSelectedCardItems = (cards_id) => (dispatch, getState) => {
  // Тут походу на беке захардкоден user --- беда.
  // setTimeout( () => {
    dispatch({
      type: 'GET_SELECTED_CARD_ITEMS__LOADING'
    })
  // })
  // setTimeout( () => {
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
  // })
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

export const clearSelectedCardItems = () => {
  return {
    type: 'CLEAR_SELECTED_CARD_ITEMS'
  }
}

// ---------- END OF SELECTED CARD ITEMS ---------- //
// ---------- GET USER CARDS Все колоды карт (бесплатные и оплаченные) пользователя ---------- //

export const getUserCards = () => (dispatch, getState) => {
  const user_login = getState().user.login
  const user_tools = getState().user.tools
    dispatch({
      type: 'GET_USER_CARDS__LOADING'
    })
    fetch(`/api/userscards?user_login=${user_login}&user_tools=${user_tools}`)
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
}

// ---------- END OF GET USER CARDS ---------- //


// ---------- GET PAY CARDS Все платные, но не оплаченные пользователем колоды карт ---------- //

export const getPayCards = () => (dispatch, getState) => {
  const user_login = getState().user.login
  const user_tools = getState().user.tools
  dispatch({
    type: 'GET_CARDS_PAY__LOADING'
  })
  fetch(`/api/paycards?user_login=${user_login}&user_tools=${user_tools}`)
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
}

// ---------- END OF GET PAY CARDS ---------- //


// ---------- CARDS THIS SESSION Вся логика по работе с картами сессии, записанными в БД ---------- //

export const getCardsThisSession = () => (dispatch, getState) => {
  const session_id = getState().thisSession.session_id
  dispatch({
    type: 'GET_CARDS_THIS_SESSIONS__LOADING'
  })
  fetch(`/api/cardsthissession?session_id=${session_id}`)
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
}

export const clearAllCardsThisSession = () => {
  return {
    type: 'CLEAR_ALL_CARDS_THIS_SESSION'  // И существующие и локал кардс
  }
}

export const saveCardThisSession = (card, position_left, position_top, scale, session_id) => (dispatch, getState) => {}

export const increaseThisSession = (card, position_left, position_top, scale) => (dispatch, getState) => {
  const modificator = getState().user.type
    dispatch({
      type: 'INCREASE_THIS_SESSION',
      payload: {
        modificator,
        card,
        position_left,
        position_top,
        scale
      }
    })
}

// ---------- END OF CARDS THIS SESSION ---------- //


// ---------- SELECTED CARD ITEMS Карты из выбранной для работы колоды ---------- //

export const getAllSelectedCardItemsInit = session_id => (dispatch, getState) => {
  // dispatch({
  //   type: 'SET_INITIAL_ACTIVE_CARD_BOX',
  //   payload: {
  //     cardsBox_id
  //   }
  // })
  dispatch({
    type: 'GET_SELECTED_CARD_ITEMS__LOADING'
  })
  fetch(`/api/allselectedcardsitemsbase?session_id=${session_id}`)
    .then(res => res.json())
    .then(res => {
      if (res[0].active_card_box > 0) {
        fetch(`/api/allselectedcardsitemsacb?carbox_id=${res[0].active_card_box}`)
      }
      console.log(res)
    }
      // dispatch({
      //   type: 'GET_INIT_ALL_SELECTED_CARD_ITEMS__SUCCESS',
      //   response: res,
      // })
    )
    .catch(error => {
      dispatch({
        type: 'GET_SELECTED_CARD_ITEMS__FAILED',
        error,
      })
    })
}

export const getSelectedCardItems = (cards_id) => (dispatch, getState) => {
    dispatch({
      type: 'GET_SELECTED_CARD_ITEMS__LOADING'
    })
    fetch(`/api/selectedcardsitems?cards_id=${cards_id}`)
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
}

export const addSelectedCardItems = (cardsBox_id) => (dispatch) => {
  // setTimeout( () => {
// Фикс бага Warning: Cannot update a component (`ConnectFunction`) while rendering a different component (`ConsultationCards`) ... ...
// Здесь, видимо, речь о том, что при рендере компонента, мы меяем стор и этот же компонент рендереится в тот же момент, т.е. два рендера одного компонента одновременно. Но я не уверен, что именно в этом казус.
// ТаймАут без задержки вроде как должен дать закончиться предыдующему коду, прежде чем задиспатчить этот экшн, что кажись помогает.

// Убрал ТаймАут пока, т.к. закомментил проблемную строку.
    dispatch({
      type: 'ADD_SELECTED_CARD_ITEMS',
      payload: {
        cardsBox_id: cardsBox_id
      }
    })
  // })

}

export const clearSelectedCardItems = () => {
  return {
    type: 'CLEAR_SELECTED_CARD_ITEMS'
  }
}

// ---------- END OF SELECTED CARD ITEMS ---------- //
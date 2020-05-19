import {api_path} from '../common'

export const getCardsThisSession = () => (dispatch, getState) => {
  const user_login = getState().user.login
  setTimeout( () => {
    dispatch({
      type: 'GET_CARDS_THIS_SESSIONS__LOADING'
    })
  })
  setTimeout( () => {
    fetch(`${api_path}cards.php?name=${user_login}&type=getCardsThisSessions`)
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
  }, 1500)
}

export const saveCardThisSession = (cards_id, card, position_left, position_top) => (dispatch, getState) => {
  const user_login = getState().user.login
  fetch(`${api_path}cards.php`, {
    method: 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},
    body: `saveCardThisSession=ok&name=${user_login}&cards_id=${cards_id}&cards_name=${card.cards_name}&cards_img=${card.cards_img}&position_left=${position_left}&position_top=${position_top}`
  })
    .then(response => response.text())
    .then(data => {
      if (data === 'INSERT_CARD_THIS_SESSION') {
        dispatch({
          type: 'SAVE_CARD_THIS_SESSION'
        })
      }
    })
    .catch(e => console.log('catch error =>', e))
}
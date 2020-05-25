export const thisSessionCardsReducer = (thisSessionState = { isLoaded: false, isLoading: false, data: {} }, action) => {  
    switch (action.type) {
      case 'GET_CARDS_THIS_SESSIONS__LOADING': {
        // console.log('GET_CARDS_THIS_SESSIONS__LOADING')
        return {
          isLoaded: false,
          isLoading: true,
          data: {}
        }
      }
      case 'GET_CARDS_THIS_SESSIONS__SUCCESS': {
        // console.log('GET_CARDS_THIS_SESSIONS__SUCCESS')
        const data_new = {...thisSessionState.data}
          action.response.forEach(element => {
            data_new[element.cards_id] = {
              card: {
                cards_id:   element.cards_id,
                cards_name: element.cards_name,
                cards_img:  element.cards_img,
              },
              position_left:  element.position_left,
              position_top:   element.position_top,
              scale:          element.scale
            }
          })
        return {
          isLoaded: true,
          isLoading: false,
          data: {...data_new}
        }
      }
      case 'GET_CARDS_THIS_SESSIONS__FAILED': {
        // console.log('GET_CARDS_THIS_SESSIONS__FAILED')
        return {
          isLoaded: true,
          isLoading: false,
          data: {"ERROR": action.error}
        }
      }
      case 'CLEAR_CARDS_THIS_SESSION': {
        console.log('CLEAR_CARDS_THIS_SESSION')
        return {
          isLoaded: false,
          isLoading: false,
          data: {}
        }
      }
      default: {
        return {
          ...thisSessionState
        }
      }
    }
  }
export const thisSessionReducer = (thisSessionState = { isLoaded: false, isLoading: false, data: {} }, action) => {  
    switch (action.type) {
      case 'GET_CARDS_THIS_SESSIONS__LOADING': {
        console.log('GET_CARDS_THIS_SESSIONS__LOADING')
        return {
          isLoaded: false,
          isLoading: true,
          data: {...thisSessionState.data}
        }
      }
      case 'GET_CARDS_THIS_SESSIONS__SUCCESS': {
        console.log('GET_CARDS_THIS_SESSIONS__SUCCESS')
        const data_new = {...thisSessionState.data}
          action.response.forEach(element => {
            data_new[element.cards_id] = {
              card: {
                cards_id: element.cards_id,
                cards_name: element.cards_name,
                cards_img: element.cards_img,
              },
              // cards_box: element.cards_box,
              // cardInUse: false,
              position_left: element.position_left,
              position_top: element.position_top
            }
          })
        return {
          isLoaded: true,
          isLoading: false,
          data: {...data_new}
        }
      }
      case 'GET_CARDS_THIS_SESSIONS__FAILED': {
        console.log('GET_CARDS_THIS_SESSIONS__FAILED')
        return {
          isLoaded: true,
          isLoading: false,
          data: {"ERROR": action.error}
        }
      }
      case 'SAVE_CARD_THIS_SESSION': {
        console.log('SAVE_CARD_THIS_SESSION')
        return {
          isLoaded: false,
          isLoading: false,
          data: {...thisSessionState.data}
        }
      }
      // case 'SAVE_CARD_THIS_SESSION': {
          // console.log('SAVE_CARD_THIS_SESSION')
        // const new_data = {...thisSessionState}
        //   if (new_data[action.payload.cards_id] === undefined) {
        //     new_data[action.payload.cards_id] = {
        //       "card": action.payload.card,
        //       "position_left": action.payload.position_left,
        //       "position_top": action.payload.position_top
        //     }
        //   } else {
        //     new_data[action.payload.cards_id].position_left = action.payload.position_left
        //     new_data[action.payload.cards_id].position_top = action.payload.position_top
        //   }
        // return {
        //   ...new_data
        // }
      // }
      default: {
        return {
          ...thisSessionState
        }
      }
    }
  }
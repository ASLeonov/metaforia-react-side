export const thisSessionReducer = (thisSessionState = {}, action) => {       //existsCardsID: {}, isExist: false,  
    switch (action.type) {
      case 'SAVE_CARD_THIS_SESSION': {
        // console.log('SAVE_CARD_THIS_SESSION')
        const new_data = {...thisSessionState}
        new_data[action.payload.cards_id] = {
          "card": action.payload.card,
          "position_left": action.payload.position_left,
          "position_top": action.payload.position_top
        }
        return {
          ...new_data
        }
      }
      default: {
        return {
          ...thisSessionState
        }
      }
    }
  }
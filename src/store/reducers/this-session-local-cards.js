export const thisSessionLocalCardsReducer = (thisSessionLocalState = {}, action) => {  
    switch (action.type) {
      case 'SAVE_CARD_THIS_SESSION_LOCAL': {
        const {card, position_left, position_top, scale} = action.payload
        // console.log('scale in reducer', scale)
          const new_state = {...thisSessionLocalState}
          new_state[card.cards_id] = {
              card,
              position_left,
              position_top,
              scale
            }
        return {
          ...new_state
        }
      }
      default: {
        return {
          ...thisSessionLocalState
        }
      }
    }
  }
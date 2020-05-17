export const userSelectedCardReducer = 
  (
    userSelectedCardItemsState = { isLoaded: false, isLoading: false, data: {} },             //isLoaded: false, isLoading: false, cardsID: null, data: []
    action
  ) => {
    switch (action.type) {
      case 'ADD_SELECTED_CARD_ITEMS': {
        // console.log('ADD_SELECTED_CARD_ITEMS')
        return {
          isLoaded: false,
          isLoading: false,
          data: {...userSelectedCardItemsState.data}
        }
      }
      case 'GET_SELECTED_CARD_ITEMS__LOADING': {
        // console.log('GET_SELECTED_CARD_ITEMS__LOADING')
        return {
          isLoaded: false,
          isLoading: true,
          data: {...userSelectedCardItemsState.data}
        }
      }
      case 'GET_SELECTED_CARD_ITEMS__SUCCESS': {
        // console.log('GET_SELECTED_CARD_ITEMS__SUCCESS')
        const data_new = {...userSelectedCardItemsState.data}
        data_new[action.response[0].cards_box] = action.response
        return {
          isLoaded: true,
          isLoading: false,
          data: {...data_new}
        }
      }
      case 'GET_SELECTED_CARD_ITEMS__FAILED': {
        console.log('GET_SELECTED_CARD_ITEMS__FAILED')
        return {
          isLoaded: true,
          isLoading: false,
          cardsID: null,
          data: {"ERROR": action.error}
        }
      }
      default: {
        return {
          ...userSelectedCardItemsState
        }
      }
    }
  }
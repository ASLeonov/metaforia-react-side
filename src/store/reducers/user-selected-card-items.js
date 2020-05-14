export const userSelectedCardItems = (userSelectedCardItemsState = {isLoaded: false, isLoading: false, data: []}, action) => {
  switch (action.type) {
    // case 'CLEAR_SESSIONS_CURRENT': {
    //   // console.log('GET_SESSIONS_CURRENT__CLEAR')
    //   return {
    //     isLoaded: false,
    //     isLoading: false,
    //     data: []
    //   }
    // }
    case 'GET_SELECTED_CARD_ITEMS__LOADING': {
      console.log('GET_SELECTED_CARD_ITEMS__LOADING')
      return {
        isLoaded: false,
        isLoading: true,
        data: []
      }
    }
    case 'GET_SELECTED_CARD_ITEMS__SUCCESS': {
      console.log('GET_SELECTED_CARD_ITEMS__SUCCESS')
      return {
        isLoaded: true,
        isLoading: false,
        data: [...action.response]
      }
    }
    case 'GET_SELECTED_CARD_ITEMS__FAILED': {
      console.log('GET_SELECTED_CARD_ITEMS__FAILED')
      return {
        isLoaded: true,
        isLoading: false,
        data: ["ERROR"]
      }
    }
    default: {
      return {
        ...userSelectedCardItemsState
      }
    }
  }
}
export const payCardsReducer = (cardsState = {isLoaded: false, isLoading: false, data: []}, action) => {
  switch (action.type) {
    // case 'CLEAR_SESSIONS_CURRENT': {
    //   // console.log('GET_SESSIONS_CURRENT__CLEAR')
    //   return {
    //     isLoaded: false,
    //     isLoading: false,
    //     data: []
    //   }
    // }
    case 'GET_CARDS_PAY__LOADING': {
      return {
        isLoaded: false,
        isLoading: true,
        data: []
      }
    }
    case 'GET_CARDS_PAY__SUCCESS': {
      return {
        isLoaded: true,
        isLoading: false,
        data: [...action.response]
      }
    }
    case 'GET_CARDS_PAY__FAILED': {
      return {
        isLoaded: true,
        isLoading: false,
        data: ["ERROR"]
      }
    }
    default: {
      return {
        ...cardsState
      }
    }
  }
}
export const payCardsReducer = (cardsState = {isLoaded: false, isLoading: false, data: []}, action) => {
  switch (action.type) {
    case 'GET_CARDS_PAY__LOADING': {
      console.log('GET_CARDS_PAY__LOADING')
      return {
        isLoaded: false,
        isLoading: true,
        data: []
      }
    }
    case 'GET_CARDS_PAY__SUCCESS': {
      console.log('GET_CARDS_PAY__SUCCESS')
      return {
        isLoaded: true,
        isLoading: false,
        data: [...action.response]
      }
    }
    case 'GET_CARDS_PAY__FAILED': {
      console.log('GET_CARDS_PAY__FAILED')
      return {
        isLoaded: true,
        isLoading: false,
        data: ["ERROR"]
      }
    }
    case 'CLEAR_CARDS_PAY': {
      return {
        isLoaded: false,
        isLoading: false,
        data: []
      }
    }
    default: {
      return {
        ...cardsState
      }
    }
  }
}
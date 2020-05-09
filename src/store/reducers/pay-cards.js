export const payCardsReducer = (cardsState = {isLoaded: false, data: []}, action) => {
  switch (action.type) {
    case 'GET_CARDS_PAY__SUCCESS': {
      return {
        isLoaded: true,
        data: [...action.response]
      }
    }
    case 'GET_CARDS_PAY__FAILED': {
      return {
        isLoaded: true, 
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
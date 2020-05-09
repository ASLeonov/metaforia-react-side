export const freeCardsReducer = (cardsState = {isLoaded: false, data: []}, action) => {
  switch (action.type) {
    case 'GET_CARDS_FREE__SUCCESS': {
      return {
        isLoaded: true,
        data: [...action.response]
      }
    }
    case 'GET_CARDS_FREE__FAILED': {
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
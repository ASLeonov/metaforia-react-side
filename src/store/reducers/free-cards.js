export const freeCardsReducer = (cardsState = [], action) => {
  switch (action.type) {
    case 'GET_FREE_CARDS__SUCCESS': {
      return [...action.response]
    }
    default: {
      return [...cardsState]
    }
  }
}
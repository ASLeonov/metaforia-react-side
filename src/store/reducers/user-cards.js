export const userCardsReducer = (userCardsState = {isLoaded: false, isLoading: false, data: []}, action) => {
  switch (action.type) {
    case 'GET_USER_CARDS__LOADING': {
      console.log('GET_USER_CARDS__LOADING')
      return {
        isLoaded: false,
        isLoading: true,
        data: []
      }
    }
    case 'GET_USER_CARDS__SUCCESS': {
      console.log('GET_USER_CARDS__SUCCESS')
      return {
        isLoaded: true,
        isLoading: false,
        data: [...action.response]
      }
    }
    case 'GET_USER_CARDS__FAILED': {
      console.log('GET_USER_CARDS__FAILED')
      return {
        isLoaded: true,
        isLoading: false,
        data: ["ERROR"]
      }
    }
    case 'CLEAR_USER_CARDS': {
      return {
        isLoaded: false,
        isLoading: false,
        data: []
      }
    }
    default: {
      return {
        ...userCardsState
      }
    }
  }
}
export const userCardsReducer = (userCardsState = {isLoaded: false, isLoading: false, data: []}, action) => {
  switch (action.type) {
    // case 'CLEAR_SESSIONS_CURRENT': {
    //   // console.log('GET_SESSIONS_CURRENT__CLEAR')
    //   return {
    //     isLoaded: false,
    //     isLoading: false,
    //     data: []
    //   }
    // }
    case 'GET_USER_CARDS__LOADING': {
      // console.log('GET_USER_CARDS__LOADING')
      return {
        isLoaded: false,
        isLoading: true,
        data: []
      }
    }
    case 'GET_USER_CARDS__SUCCESS': {
      // console.log('GET_USER_CARDS__SUCCESS')
      return {
        isLoaded: true,
        isLoading: false,
        data: [...action.response]
      }
    }
    case 'GET_USER_CARDS__FAILED': {
      // console.log('GET_USER_CARDS__FAILED')
      return {
        isLoaded: true,
        isLoading: false,
        data: ["ERROR"]
      }
    }
    default: {
      return {
        ...userCardsState
      }
    }
  }
}
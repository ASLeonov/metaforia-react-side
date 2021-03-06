export const lastSessionsReducer = (sessionsState = {isLoaded: false, isLoading: false, data: []}, action) => {
  switch (action.type) {
    case 'GET_SESSIONS_LAST__LOADING': {
      console.log('GET_SESSIONS_LAST__LOADING')
      return {
        isLoaded: false,
        isLoading: true,
        data: []
      }
    }
    case 'GET_SESSIONS_LAST__SUCCESS': {
      console.log('GET_SESSIONS_LAST__SUCCESS')
      return {
        isLoaded: true,
        isLoading: false,
        data: [...action.response]
      }
    }
    case 'GET_SESSIONS_LAST__FAILED': {
      console.log('GET_SESSIONS_LAST__FAILED')
      return {
        isLoaded: true,
        isLoading: false,
        data: ["ERROR"]
      }
    }
    case 'CLEAR_SESSIONS_LAST': {
      return {
        isLoaded: false,
        isLoading: false,
        data: []
      }
    }
    default: {
      return {
        ...sessionsState
      }
    }
  }
}
export const currentSessionsReducer = (sessionsState = {isLoaded: false, isLoading: false, data: []}, action) => {
  switch (action.type) {
    case 'CLEAR_SESSIONS_CURRENT': {
      // console.log('GET_SESSIONS_CURRENT__CLEAR')
      return {
        isLoaded: false,
        isLoading: false,
        data: []
      }
    }
    case 'GET_SESSIONS_CURRENT__LOADING': {
      // console.log('GET_SESSIONS_CURRENT__LOADING')
      return {
        isLoaded: false,
        isLoading: true,
        data: []
      }
    }
    case 'GET_SESSIONS_CURRENT__SUCCESS': {
      // console.log('GET_SESSIONS_CURRENT__SUCCESS')
      return {
        isLoaded: true,
        isLoading: false,
        data: [...action.response]
      }
    }
    case 'GET_SESSIONS_CURRENT__FAILED': {
      // console.log('GET_SESSIONS_CURRENT__FAILED')
      return {
        isLoaded: true,
        isLoading: false,
        data: ["ERROR"]
      }
    }
    default: {
      return {
        ...sessionsState
      }
    }
  }
}
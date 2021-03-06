export const currentSessionsReducer = (sessionsState = {isLoaded: false, isLoading: false, data: []}, action) => {
  switch (action.type) {
    case 'GET_SESSIONS_CURRENT__LOADING': {
      console.log('GET_SESSIONS_CURRENT__LOADING')
      return {
        isLoaded: false,
        isLoading: true,
        data: []
      }
    }
    case 'GET_SESSIONS_CURRENT__SUCCESS': {
      console.log('GET_SESSIONS_CURRENT__SUCCESS')
      return {
        isLoaded: true,
        isLoading: false,
        data: [...action.response]
      }
    }
    case 'GET_SESSIONS_CURRENT__FAILED': {
      console.log('GET_SESSIONS_CURRENT__FAILED')
      return {
        isLoaded: true,
        isLoading: false,
        data: ["ERROR"]
      }
    }
    case 'CLEAR_SESSIONS_CURRENT': {
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
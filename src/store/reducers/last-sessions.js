export const lastSessionsReducer = (sessionsState = {isLoaded: false, data: []}, action) => {
  switch (action.type) {
    case 'GET_SESSIONS_LAST__SUCCESS': {
      return {
        isLoaded: true,
        loading: false,
        data: [...action.response]
      }
    }
    case 'GET_SESSIONS_LAST__FAILED': {
      return {
        isLoaded: true, 
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
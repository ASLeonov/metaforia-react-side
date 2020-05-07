export const currentSessionsReducer = (sessionsState = {isLoaded: false, data: []}, action) => {
  switch (action.type) {
    case 'GET_SESSIONS_CURRENT__SUCCESS': {
      // console.log('GET_SESSIONS_CURRENT__SUCCESS ->', action.type)
      return {
        isLoaded: true,
        data: [...action.response]
      }
    }
    case 'GET_SESSIONS_CURRENT__FAILED': {
      // console.log('GET_SESSIONS_CURRENT__FAILED ->', action.type)
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
export const thisSessionReducer = (thisSessionState = { session_id: null, last_version: null }, action) => {  
    switch (action.type) {
      case 'SET_THIS_SESSION': {
        console.log('SET_THIS_SESSION')
        return {
          session_id: action.payload.session_id,
          last_version: Number(action.payload.last_version),
        }
      }
      case 'INCREASE_THIS_SESSION': {
        console.log('INCREASE_THIS_SESSION')
        const new_version = thisSessionState.last_version + 1
        return {
          session_id: thisSessionState.session_id,
          last_version: new_version,
        }
      }
      case 'CLEAR_THIS_SESSION': {
        console.log('CLEAR_THIS_SESSION')
        return {
          session_id: null,
          last_version: null,
        }
      }
      default: {
        return {
          ...thisSessionState
        }
      }
    }
  }
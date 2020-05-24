// import {api_path} from '../common'

export const setThisSession = (session_id, last_version) => {
  return {
    type: 'SET_THIS_SESSION',
    payload: {
      session_id,
      last_version
    }
  }
}
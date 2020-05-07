import {combineReducers} from 'redux'
import {userReducer} from './user'
import {currentSessionsReducer} from './current-sessions'
import {lastSessionsReducer} from './last-sessions'

export const reducer = combineReducers({
  user: userReducer,
  currentSessions: currentSessionsReducer,
  lastSessions: lastSessionsReducer,
})
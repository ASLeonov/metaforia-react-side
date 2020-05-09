import { combineReducers } from 'redux'
import { userReducer } from './user'
import { currentSessionsReducer } from './current-sessions'
import { lastSessionsReducer } from './last-sessions'
import { freeCardsReducer } from './free-cards'
import { payCardsReducer } from './pay-cards'
import { contactsReducer } from './contacts'

export const reducer = combineReducers({

  user: userReducer,

  currentSessions: currentSessionsReducer,
  lastSessions: lastSessionsReducer,

  freeCards: freeCardsReducer,
  payCards: payCardsReducer,

  contacts: contactsReducer
  
})
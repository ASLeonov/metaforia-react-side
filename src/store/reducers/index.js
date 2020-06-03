import { combineReducers } from 'redux'
import { userReducer } from './user'
import { currentSessionsReducer } from './current-sessions'
import { lastSessionsReducer } from './last-sessions'
import { payCardsReducer } from './pay-cards'
import { userCardsReducer } from './user-cards'
import { userSelectedCardReducer } from './user-selected-card-items'
import { thisSessionReducer } from './this-session'
import { contactsReducer } from './contacts'

export const reducer = combineReducers({

  user: userReducer,

  sessionsCurrent:  currentSessionsReducer,
  sessionsLast:     lastSessionsReducer,

  payCards: payCardsReducer,

  userCards: userCardsReducer,

  thisSession: thisSessionReducer,

  userSelectedCards: userSelectedCardReducer,

  contacts: contactsReducer
  
})
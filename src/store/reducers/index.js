import { combineReducers } from 'redux'
import { userReducer } from './user'
import { currentSessionsReducer } from './current-sessions'
import { lastSessionsReducer } from './last-sessions'
// import { freeCardsReducer } from './free-cards'
import { payCardsReducer } from './pay-cards'
import { userCardsReducer } from './user-cards'
import { userSelectedCardReducer } from './user-selected-card-items'
import { thisSessionReducer } from './this-session'
import { thisSessionCardsReducer } from './this-session-cards'
import { thisSessionLocalCardsReducer } from './this-session-local-cards'
import { contactsReducer } from './contacts'

export const reducer = combineReducers({

  user: userReducer,

  currentSessions: currentSessionsReducer,
  lastSessions: lastSessionsReducer,

  // freeCards: freeCardsReducer,
  payCards: payCardsReducer,

  userCards: userCardsReducer,

  thisSession: thisSessionReducer,

  userSelectedCards: userSelectedCardReducer,

  cardsThisSession: thisSessionCardsReducer,
  
  cardsThisSessionLocal: thisSessionLocalCardsReducer,

  contacts: contactsReducer
  
})
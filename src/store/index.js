import {createStore, applyMiddleware} from 'redux'
import {reducer} from './reducers'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

const enhancer = composeWithDevTools(
  applyMiddleware(
    thunk
  )
)

export const store = createStore(reducer, enhancer)

// ONLY FOR DEV
if (process.env.NODE_ENV === 'development') {
  window.store = store
}
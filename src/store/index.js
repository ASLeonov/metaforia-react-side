import {createStore, applyMiddleware} from 'redux'
import {reducer} from './reducers'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
// import api from './middlewares/api'
import {dev_mode} from '../settings'

const enhancer = composeWithDevTools(
  applyMiddleware(
    thunk
    // api
  )
)

export const store = createStore(reducer, enhancer)

// ONLY FOR DEV
if (dev_mode) {
  window.store = store
}
import React from 'react'
import {Provider} from 'react-redux'
import {store} from '../../store'
import AppLevel from '../app-level'
import './app.css'

function App() {

  // console.log('render App')

  return (
    <Provider store={store}>
      <div className="app">
        <AppLevel />
      </div>
    </Provider>
  )
}

export default App
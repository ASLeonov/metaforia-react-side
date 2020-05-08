import React from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom"
import {Provider} from 'react-redux'
import {store} from '../../store'
import Header from '../header'
import Middle from '../middle'
import Footer from '../footer'
import './app.css'


      import Sidebar from '../sidebar'
      import SessionsCaption from '../sessions/sessions-caption'
      import SessionsBody from '../sessions/sessions-body'


function App() {

  // console.log('render App')

  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Header />
            <Switch>
              <Route path="/current-sessions">
                {/* <Middle activePage="sessions" activeTab="currentSessions"/> */}
                <div className="middle">
                  <Sidebar activePage="sessions" />
                  <div className="content">
                    <div className="content-sessions">
                      <SessionsCaption />
                      <SessionsBody activeSessionsTab="currentSessions" />
                    </div>               
                  </div>
                </div>
              </Route>
              <Route path="/last-sessions">
                <Middle activePage="sessions" activeTab="lastSessions"/>
              </Route>
              <Route path="/free-cards">
                <Middle activePage="cards" activeTab="freeCards" />
              </Route>
              <Route path="/pay-cards">
                <Middle activePage="cards" activeTab="payCards"/>
              </Route>
              <Route path="/client-cards">
                <Middle activePage="cards" activeTab="clientCards"/>
              </Route>
              <Route path="/contacts">
                <Middle activePage="contacts" />
              </Route>
              <Redirect from={'/'} to={'/current-sessions'} />
            </Switch>
          <Footer />
        </div>
      </Router>
    </Provider>
  )
  
}

export default App
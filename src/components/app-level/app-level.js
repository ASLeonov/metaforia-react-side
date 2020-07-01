import React from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom"
import {useSelector} from 'react-redux'
import Header from '../header'
import Middle from '../middle'
import Footer from '../footer'
import Login from '../login'


function AppLevel() {

  const user = useSelector(state => state.user)

  // const isLogin = localStorage.getItem('token')

  console.log('render AppLevel')

  return(
    <Router>
      <Header />
        <Switch>
          {user.fullname.length === 0 ?     // user.fullname.length === 0 && localStorage.getItem('jwt') !== '123'
            <>
              <Route path="/login">
                <Login />
              </Route>
              <Redirect from={'/'} to={'/login'} />       
            </> : 
            <>
              {user.type === 'master' ? 
                <>
                  <Route path="/consultation">
                    <Middle activePage="consultation" />
                  </Route>
                  <Route path="/current-sessions">
                    <Middle activePage="sessions" activeTab="currentSessions" />
                  </Route>
                  <Route path="/last-sessions">
                    <Middle activePage="sessions" activeTab="lastSessions" />
                  </Route>
                  <Route path="/free-cards">
                    <Middle activePage="cards" activeTab="freeCards" />
                  </Route>
                  <Route path="/pay-cards">
                    <Middle activePage="cards" activeTab="payCards" />
                  </Route>
                  <Route path="/client-cards">
                    <Middle activePage="cards" activeTab="clientCards" />
                  </Route>
                  <Route path="/contacts">
                    <Middle activePage="contacts" activeTab="currentContacts" />
                  </Route>
                  <Route path="/add-contacts">
                    <Middle activePage="contacts" activeTab="addContacts" />
                  </Route>
                  <Redirect from={'/'} to={'/current-sessions'} />
                </> : 
                <>
                  <Route path="/consultation">
                    <Middle activePage="consultation" />
                  </Route>
                  <Route path="/current-sessions">
                    <Middle activePage="sessions" activeTab="currentSessions" />
                  </Route>
                  <Route path="/last-sessions">
                    <Middle activePage="sessions" activeTab="lastSessions" />
                  </Route>
                  <Redirect from={'/'} to={'/current-sessions'} />
                </>
              }
            </>
          }
        </Switch>
      <Footer />
    </Router>
  )

}

export default AppLevel


// Этот компонент - просто уровень нуеобходимый, чтобы принять user из стора и сделать в зависимости от этого роутинг. Уровнем выше этого сделать было нельзя.
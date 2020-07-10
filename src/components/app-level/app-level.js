import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom"
import {connect} from 'react-redux'
import {selectUser} from '../../store/selectors/user'
import {login_token} from '../../store/action-creators/user-actions'
import Header from '../header'
import Middle from '../middle'
import Footer from '../footer'
import Login from '../login'

function AppLevel({user, login_token}) {
  const [showApp, setShowApp] = useState(false)

  useEffect( () => {
    if (localStorage.token) {
      if (user.token !== localStorage.token) {
        if (user.login === 'UPDATE_TOKEN') {
          delete localStorage.token
          !showApp && setShowApp(true)
        } else {
          login_token(localStorage.token)
        }
      } else {
        if (user.login.length > 0 && user.login !== 'BAD_LOGIN') {
          !showApp && setShowApp(true)
        }
      }
    } else {
      (user.login.length > 0 && user.token.length > 0) && (localStorage.token = user.token)
      !showApp && setShowApp(true)
    }
    // eslint-disable-next-line
  }, [user])

  console.log('render AppLevel', showApp, user.fullname)

  if (!showApp) return null

  return(
    <Router>
      <Header />
        {user.fullname.length === 0 ?
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Redirect from={'/'} to={'/login'} />       
            </Switch> :
          <>
            {user.type === 'master' ? 
              <Switch>
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
            </Switch> :
              <Switch>
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
                </Switch>
            }
          </>
        }
      <Footer />
    </Router>
  )
}

export default connect(
  state => ({
    user: selectUser(state),
  }),
  {
    login_token
  }
)(AppLevel)


// Этот компонент - просто уровень нуеобходимый, чтобы принять user из стора и сделать в зависимости от этого роутинг. Уровнем выше этого сделать было нельзя.
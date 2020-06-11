import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getCurrentSessions, getLastSessions} from '../../../../store/action-creators/sessions-actions'
import {setThisSession} from '../../../../store/action-creators/sessions-actions'
import {selectCurrentSessions} from '../../../../store/selectors/sessions'
import {selectUser} from '../../../../store/selectors/user'
import SingleSession from '../single-session'
import Messages from '../../../messages'
import Loader from '../../../loader'
import './current-sessions.css'

function CurrentSessions(props) {
  const {user, sessions_data, getCurrentSessions, getLastSessions, setThisSession} = props

  console.log('Render Current sessions')

  let fetched = []

  if (sessions_data.isLoading) {
    fetched = <Loader />
  }

  if (sessions_data.isLoaded) {
    if (sessions_data.data[0] !== "ERROR") {
      if (sessions_data.data.length > 0) {
        fetched = sessions_data.data.map(element => (
          <SingleSession
            key={element.session_id}
            type={'current_session'}
            session={element}
            user={user}
            getCurrentSessions={getCurrentSessions}
            getLastSessions={getLastSessions}
            setThisSession={setThisSession}
          />
        ))
      } else {
        fetched = <Messages caption="message_currentSessionsNone" />
      }
    } else {
      fetched = <Messages caption="message_currentSessionsError" />
    }
  }

  useEffect( () => {
    if (!sessions_data.isLoading && !sessions_data.isLoaded) {
      getCurrentSessions()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="sessions-list">
      {fetched}
      {fetched.length > 0 ? 
        <Link to='/contacts'><button className="sessions-standart-button">Выбрать клиента и создать сессию</button></Link> : ''}
    </div>
  )
}

export default connect(
  state => ({
    sessions_data: selectCurrentSessions(state),
    user: selectUser(state)
  }),
  {
    getCurrentSessions,
    getLastSessions,
    setThisSession
  }
)(CurrentSessions)

// ПРОВЕРЕНО ЛОКАЛЬНО

// Корректная работа:
// После первого рендера, один раз вызываем useEffect - при необходимости диспатчим экшн загрузки данных.
// Лишних рендеров нет как при первой загрузке, так и при переходе по ссылкам.
// Fetch на сервер один, проблем нет.
// Рендер каждого компонента-консультации (SingleSession) тоже один. Проблем нет.
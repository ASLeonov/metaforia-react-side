import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {getLastSessions} from '../../../../store/action-creators/sessions-actions'
import {selectLastSessions} from '../../../../store/selectors/sessions'
import {selectUser} from '../../../../store/selectors/user'
import SingleSession from '../single-session'
import Messages from '../../../messages'
import Loader from '../../../loader'

function LastSessions(props) {
  const {user, sessions_data, getLastSessions} = props
  let fetched

  console.log('Render Last sessions')

  if (sessions_data.isLoading) {
    fetched = <Loader />
  }

  if (sessions_data.isLoaded) {
    if (sessions_data.data[0] !== "ERROR") {
      if (sessions_data.data.length > 0) {
        fetched = sessions_data.data.map(element => (
          <SingleSession
            key={element.session_id}
            type={'last_session'}
            session={element}
            user={user}
            getLastSessions={getLastSessions}
          />
        ))
      } else {
        fetched = <Messages caption="message_lastSessionsNone" />
      }
    } else {
      fetched = <Messages caption="message_lastSessionsError" />
    }
  }

  useEffect( () => {
    if (!sessions_data.isLoading && !sessions_data.isLoaded) {
      getLastSessions()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      {fetched}
    </div>
  )
}

export default connect(
  state => ({
    user: selectUser(state),
    sessions_data: selectLastSessions(state),
  }),
  {
    getLastSessions
  }
)(LastSessions)

// ПРОВЕРЕНО ЛОКАЛЬНО

// Корректная работа:
// После первого рендера, один раз вызываем useEffect - при необходимости диспатчим экшн загрузки данных.
// Лишних рендеров нет как при первой загрузке, так и при переходе по ссылкам.
// Fetch на сервер один, проблем нет.
// Рендер каждого компонента-консультации (SingleSession) тоже один. Проблем нет.
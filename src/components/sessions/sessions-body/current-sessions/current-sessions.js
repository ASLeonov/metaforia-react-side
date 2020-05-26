import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {getCurrentSessions, clearCurrentSessions, clearLastSessions} from '../../../../store/action-creators'
import {setThisSession, clearThisSession} from '../../../../store/action-creators/sessions-actions'
import {clearSelectedCardItems, clearCardsThisSession, clearCardThisSessionLocal} from '../../../../store/action-creators/cards-actions'
import {selectCurrentSessions} from '../../../../store/selectors/sessions'
import {selectUser} from '../../../../store/selectors'
import SingleCurrentSession from '../single-current-session'
import Messages from '../../../messages'
import Loader from '../../../loader'
import './current-sessions.css'

function CurrentSessions(props) {
  const {
    user,
    sessions_data,
    getCurrentSessions,
    clearCurrentSessions,
    clearLastSessions,
    setThisSession,
    clearThisSession,
    clearCardsThisSession,
    clearSelectedCardItems,
    clearCardThisSessionLocal
  } = props

  let fetched

  if (!sessions_data.isLoading && !sessions_data.isLoaded) {
    console.log('Запускаем fetch сессий')
    getCurrentSessions()
  }

  if (sessions_data.isLoading) {
    fetched = <Loader />
  }

  if (sessions_data.isLoaded) {
    if (sessions_data.data[0] !== "ERROR") {
      if (sessions_data.data.length > 0) {
        fetched = sessions_data.data.map( element => (
          <SingleCurrentSession
            key={element.session_id}
            session={element}
            user={user}
            clearCurrentSessions={clearCurrentSessions}
            clearLastSessions={clearLastSessions}
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

  const reload = () => clearCurrentSessions()

  useEffect( () => {
    clearThisSession()
    clearCardsThisSession()
    clearSelectedCardItems()
    clearCardThisSessionLocal()
  }, [])

  console.log('render Current Sessions', sessions_data)

  return (
    <div className="sessions-list">
      {fetched}
      <button onClick={reload}>Обновить список сессий</button>
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
    clearCurrentSessions,
    clearLastSessions,
    setThisSession,
    clearThisSession,
    clearCardsThisSession,
    clearCardThisSessionLocal,
    clearSelectedCardItems
  }
)(CurrentSessions)

// Корректная работа:
// При заходе на страницу вначале она рендерится, затем очищаем все данные по текущей сессии. Этот useEffect срабатывает один раз при монтировании компонента.
// Это сделано для контроля в случае, если пользователь из страницы консультации перейдет в новую вкладку с текущими сессиями.
// При первой загрузке страницы лишних рендеров нет.
// При переходе по ссылкам с других страниц есть один дополнительный рендер, связываю его с измением store после всех чисток в useEffect. Хотя изменяемые states не законнекчены здесь.
// Fetch на сервер один, проблем нет.
// Рендер каждого компонента-консультации (SingleCurrentSession) тоже один. Проблем нет.
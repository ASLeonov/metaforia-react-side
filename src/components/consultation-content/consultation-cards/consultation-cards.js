import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {selectUserSelectedCards, selectThisSessionCards, selectThisSessionCardsLocal} from '../../../store/selectors/cards'
import {selectThisSession} from '../../../store/selectors/sessions'
import {getSelectedCardItems, addSelectedCardItems, getCardsThisSession} from '../../../store/action-creators/cards-actions'
import {setThisSession} from '../../../store/action-creators/sessions-actions'
import SelectedCards from '../selected-cards'
import CardsThisSession from '../cards-this-session'
import Messages from '../../messages'
import Loader from '../../loader'
import './consultation-cards.css'

function ConsultationCards(props) {
  const [mixCards, setMixCards] = useState(0)
  const {thisSession, selectedCards, thisSessionCards, thisSessionCardsLocal, getCardsThisSession,  setThisSession} = props
  let fetched_selected, fetched_already_exist, local_already_exist, eventSource

  if (selectedCards.isLoading || thisSessionCards.isLoading) {
    fetched_selected = <Loader fullscreen={true} />
  }
 
  if (selectedCards.isLoaded && thisSessionCards.isLoaded) {
    if (!selectedCards.data["ERROR"] && !thisSessionCards.data["ERROR"]) {
      if (selectedCards.activeCardsBox !== props.activeCards_id) {
        // props.addSelectedCards(props.activeCards_id)
      } else {
        fetched_already_exist = 
          <CardsThisSession
            session_id={thisSession.session_id}
            thisSessionCards={thisSessionCards.data}
          />
        local_already_exist = 
          <CardsThisSession
            session_id={thisSession.session_id}
            thisSessionCardsLocal={thisSessionCardsLocal}
          />
        fetched_selected = 
          <SelectedCards
            session_id={thisSession.session_id}
            activeCardsBox={selectedCards.activeCardsBox}
            data={selectedCards.data}
            thisSessionCards={thisSessionCards.data}
            thisSessionCardsLocal={thisSessionCardsLocal}
            mixCards={mixCards}
          />
      }
    } else {
      fetched_selected = <Messages caption="message_consultCardsError" fullscreen={true} />
    }
  }

  const mixCardsClick = () => {
    setMixCards(mixCards + 1)
  }

  useEffect( () => {
    if (!selectedCards.isLoaded && !selectedCards.isLoading) {
      // Срабатывает при загрузке новой колоды в процессе консультации
      props.getSelectedCards(props.activeCards_id)
    }
    // if (!thisSessionCards.isLoaded && !thisSessionCards.isLoading) {
    //   Это загрузка существующих карт сессии - сейчас не актуальна, т.к. она происходит из <CardsBox />
    //   props.getCardsThisSession()
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCards.isLoaded])

  props.sse.onmessage = e => {
    if (thisSession.last_version !== Number(e.data)) {
      //console.log("id local не равно id server", thisSession.last_version, Number(e.data))
      setThisSession(thisSession.session_id, Number(e.data))
      getCardsThisSession()
    }
  }

  useEffect( () => () => props.sse.close(), [])

  console.log('render Consultation cards')
 
  return (
    <div className="consultation-cards">
      <div className="consultation-cards-tools">
        <div className="consultation-cards-tools-item">
          <span onClick={mixCardsClick}>Перемешать карты</span>
        </div>
        <div className="consultation-cards-tools-item consultation-cards-tools-divider">
          <span>Случайная карта</span>
        </div>
      </div>
      {local_already_exist}
      {fetched_already_exist}
      {fetched_selected}
    </div>
  )
}

export default connect(
  state => ({
    selectedCards: selectUserSelectedCards(state),
    thisSessionCards: selectThisSessionCards(state), 
    thisSessionCardsLocal: selectThisSessionCardsLocal(state),
    thisSession: selectThisSession(state)
  }),
  {
    getSelectedCards: getSelectedCardItems,
    addSelectedCards: addSelectedCardItems,
    getCardsThisSession,
    setThisSession,
  }
)(ConsultationCards)


// Корректная работа.
// После первого рендера срабатывает useEffect - при необходимости стартуем фетч карт из выбранной колоды (getSelectedCards сейчас должен срабатывать только при выборе другой колоды из режима консультации, т.к. при первичном выборе колоды он запускается из <CardsBox />), а также фетч ранее сохраненных в БД карт из текущей сессии (getCardsThisSession - вообще закомментил, т.к. запускаю также из <CardBox />).
// Лишних рендеров и фетчей не наблюдаю, все ok.


// SSE
// Здесь происходит вся работа с SSE кроме инициализации (она уровнем выше).
// При получении ответа от бэка сравнивается локальная версися косультации и серверная, если нет разницы - не делаем ничего, если есть - то приводим данные по консультации к актуальным(серверным) и фетчим последние данные по сессии.
// При unMount компонента, рушим SSE.

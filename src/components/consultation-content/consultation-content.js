import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {selectUser} from '../../store/selectors/user'
import {selectUserCards, selectUserSelectedCards} from '../../store/selectors/cards'
import {getUserCards} from '../../store/action-creators/cards-actions'
import {cardsJSX} from '../../functions/cards-box-jsx'
import ConsultationCards from './consultation-cards'
import Loader from '../loader'
import './consultation-content.css'

// import useWebSocket from 'react-use-websocket'

// import {api_path} from '../../store/common'

function ConsultationContent(props) {
  const [windowFullScreen, setWindowFullScreen] = useState(false)
  const [showChangeCards, setShowChangeCards] = useState(false)
  const [selectCards, setSelectCards] = useState(null)
  // const [isSocket, setIsSocket] = useState(false)
  const {isLoaded, isLoading, data} = props.userCards

  let fetched

      // if (!isSocket) {
        // const {sendMessage, sendJsonMessage, lastMessage, lastJsonMessage, readyState, getWebSocket} = 
        //   useWebSocket('ws://localhost:8080', {                                // wss://echo.websocket.org
        //     onOpen: () => sendMessage('init - client'),
        //     shouldReconnect: (closeEvent) => true,
        //   })
        // setIsSocket(sendMessage, sendJsonMessage, lastMessage, lastJsonMessage, readyState, getWebSocket)
      // }

  const onSelectCardsClick = cardsBox_id => {
      setShowChangeCards(false)   // скрытие вкладки выбора колоды - чтобы она не мигала при загрузке (при реальном фетче) новой колоды.
      setSelectCards(cardsBox_id)
      // if (!isSSE) {
      //   let eventSource = new EventSource(`${api_path}sse.php?name=${props.user.login}&session_id=${props.session_id}`)
      //   setIsSSE(eventSource)
      // }
  }

  if (isLoading) {
    fetched = <Loader />
  } else if (isLoaded && !props.userSelectedCards.isLoaded && !props.userSelectedCards.isLoading && !selectCards) {
    fetched = cardsJSX(data, 'consult-mode-enter', 'freeCards', onSelectCardsClick)
  }

  const onChangeWindow = () => {
    if (showChangeCards) setShowChangeCards(false)
    setWindowFullScreen(!windowFullScreen)
  }
  const window_CN = windowFullScreen ? "consultation_large" : "consultation_low"

  const setCards = (event) => {
    if (event.target === event.currentTarget) {
      setShowChangeCards(!showChangeCards)
    }
  }

  console.log('render Consultation content')

  useEffect( () => {
    if (!isLoaded && !isLoading) {
      props.getUserCards()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={window_CN}>
      <div className="consultation-header">
        <div className="consultation-header-buttons">
          <span className="consultation-header-button" onClick={setCards} style={showChangeCards ? {backgroundColor:'#f5deb3'} : {}}>
            {showChangeCards ? 'Скрыть вкладку' : 'Сменить колоду'}
          </span>
          <span className="consultation-header-button">
            Пауза для клиента
          </span>
          <span className="consultation-header-button">
            Закрыть сессию
          </span>
        </div>
          <div className="consultation-header-setCards-wrapper" onClick={setCards} style={showChangeCards ? {display:'block'} : {}}>
            <div className="consultation-header-setCards">
              {(showChangeCards && !isLoading && isLoaded) ? 
                cardsJSX(data, 'consult-mode-play', 'freeCards', onSelectCardsClick, selectCards) : ''}
            </div>
          </div>
        <span className="consultation-header-closeButton" title={windowFullScreen ? "Свернуть окно" : "В полноэкранный режим"} onClick={onChangeWindow}>
          {windowFullScreen ? 'x' : '▢'}
        </span>
      </div>
      <div className="consultation-field">
        {!selectCards ? <h2 style={{textAlign:'center'}}>Выберите колоду для консультации</h2> : ''}
        <div className={selectCards ? "consultation-set-cards__none" : "consultation-set-cards"}>
          {fetched}
        </div>
        {!windowFullScreen && selectCards ? 
          <h4 className="consultation-field-message" onClick={onChangeWindow}>
            Для отображения колоды и поля
            <span style={{textDecoration:'underline', marginTop:'15px'}}> перейдите в полноэкранный режим</span>
          </h4> : ''
        }
      </div>
        {selectCards ? <ConsultationCards activeCards_id={selectCards} user={props.user} /> : ''}
    </div>
  )
}

export default connect(
  state => ({
      user: selectUser(state),
      userCards: selectUserCards(state),
      userSelectedCards: selectUserSelectedCards(state)
  }),
  {
    getUserCards
  }
)(ConsultationContent)

// ПРОВЕРЕНО ЛОКАЛЬНО

// Корректная работа.
// После монтирования срабатывает useEffect - при необходимости фетчим доступные для работы колоды (getUserCards) и отображаем их на экране с флагом 'consult-mode-enter', который говорит о том, что при клике на колоду, надо запустить фетч этой колоды и существующих карта сессии и сделать сетстейт компонента. На этом этапе лишних рендеров нет, фетч один - все ok.
// При выборе рабочей колоды запускаются фетчи (из компонента <CardsBox />) и происходит сетстейт компонента (selectCards равно id колоды) и, так как, теперь есть selectCards, то будет рендер компонента <ConsultationCards />.
// При изменении стейта showChangeCards (true - показ выбора колод в игровом режиме или false - в противном случае) перерендеривания <ConsultationCards /> не происходит - это хорошо. Перерендеривает <ConsultationCards /> только при реальном изменении колоды.
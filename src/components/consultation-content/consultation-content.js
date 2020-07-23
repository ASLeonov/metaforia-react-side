import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {selectUser} from '../../store/selectors/user'
import {selectThisSession} from '../../store/selectors/sessions'
import {selectUserCards, selectUserSelectedCards} from '../../store/selectors/cards'
import {getUserCards} from '../../store/action-creators/cards-actions'
import {cardsJSX} from '../../functions/cards-box-jsx'
import ConsultationCards from './consultation-cards'
import Loader from '../loader'
import './consultation-content.css'

function ConsultationContent(props) {
  const [windowFullScreen, setWindowFullScreen] = useState(false)
  const [showChangeCards, setShowChangeCards]   = useState(false)
  const [selectCards, setSelectCards]           = useState(null)
  const {isLoaded, isLoading, data} = props.userCards
  const {user, socket, session_id, last_version} = props

  let fetched

  const onSelectCardsClick = cardsBox_id => {
      setShowChangeCards(false)   // скрытие вкладки выбора колоды - чтобы она не мигала при загрузке (при реальном фетче) новой колоды.
      setSelectCards(cardsBox_id)
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

  useEffect( () => {
    if (!isLoaded && !isLoading) {
      props.getUserCards()
    }
    // eslint-disable-next-line
  }, [])

  useEffect( () => {
    const ACB = props.userSelectedCards.activeCardsBox
    if (!selectCards && ACB) {
      setSelectCards(ACB)
    }
    // eslint-disable-next-line
  }, [props.userSelectedCards.activeCardsBox])

  if (isLoading) {
    fetched = <Loader />
  } else if (isLoaded && !props.userSelectedCards.isLoaded && !props.userSelectedCards.isLoading && !selectCards) {
    fetched = cardsJSX(data, 'consult-mode-enter', 'freeCards', onSelectCardsClick)
  }

  console.log('render Consultation content')

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
                cardsJSX(data, 'consult-mode-play', 'freeCards', onSelectCardsClick, selectCards, socket, user, session_id, last_version) : ''}
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
        {selectCards ? <ConsultationCards activeCards_id={selectCards} user={user} socket={socket} /> : ''}
    </div>
  )
}

export default connect(
  state => ({
      user: selectUser(state),
      userCards: selectUserCards(state),
      session_id: selectThisSession(state).session_id,
      last_version: selectThisSession(state).last_version,
      userSelectedCards: selectUserSelectedCards(state)
  }),
  {
    getUserCards
  }
)(ConsultationContent)

// ПРОВЕРЕНО ЛОКАЛЬНО  ПРОВЕРЯТЬ ЗАННОВО !!!

// Корректная работа.
// После монтирования срабатывает useEffect - при необходимости фетчим доступные для работы колоды (getUserCards) и отображаем их на экране с флагом 'consult-mode-enter', который говорит о том, что при клике на колоду, надо запустить фетч этой колоды и существующих карта сессии и сделать сетстейт компонента. На этом этапе лишних рендеров нет, фетч один - все ok.
// При выборе рабочей колоды запускаются фетчи (из компонента <CardsBox />) и происходит сетстейт компонента (selectCards равно id колоды) и, так как, теперь есть selectCards, то будет рендер компонента <ConsultationCards />.
// При изменении стейта showChangeCards (true - показ выбора колод в игровом режиме или false - в противном случае) перерендеривания <ConsultationCards /> не происходит - это хорошо. Перерендеривает <ConsultationCards /> только при реальном изменении колоды.
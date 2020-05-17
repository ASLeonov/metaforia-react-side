import React, {useState} from 'react'
import {connect} from 'react-redux'
import {selectUserCards} from '../../store/selectors/cards'
import {getUserCards} from '../../store/action-creators'
import CardsBox from '../cards/cards-box'
import ConsultationCards from './consultation-cards'
import Messages from '../messages'
import Loader from '../loader'
import './consultation-content.css'

function ConsultationContent(props) {
  const [windowFullScreen, setWindowFullScreen] = useState(false)
  const [showChangeCards, setShowChangeCards] = useState(false)
  const [selectCards, setSelectCards] = useState(null)
  const {isLoaded, isLoading, data} = props.userCards

  let fetched

  const onSelectCardsClick = cardsBox_id => {
    setSelectCards(cardsBox_id)
  }

  const userCardsJSX = (data, result) => {
    if (data.length > 0) {
      result = data.map(
        element => (
          <CardsBox
            key={element.cards_id}
            cards={element}
            mode="consult_mode"
            callback={onSelectCardsClick}
          />
        )
      )
    } else {
      result = <Messages caption="message_freeCardsNone" />
    }
    return result
  }

  if (!isLoaded && !isLoading) {
    props.getUserCards()
  }

  if (isLoading) {
    fetched = <Loader />
  } else if (isLoaded) {
    if (data[0] !== "ERROR") {
      if (data.length > 0) {
        fetched = userCardsJSX(data)
      } else {
        fetched = <Messages caption="message_freeCardsNone" />
      }
    } else {
      fetched = <Messages caption="message_freeCardsError" />
    }
  }

  const onChangeWindow = () => {
    if (showChangeCards) setShowChangeCards(false)
    setWindowFullScreen(!windowFullScreen)
  }
  const window_CN = windowFullScreen ? "consultation_large" : "consultation_low"

  const setCards = () => {
    setShowChangeCards(!showChangeCards)
  }

  return (
    <div className={window_CN}>
      <div className="consultation-header">
        <div className="consultation-header-buttons">
          <span className="consultation-header-button" onClick={setCards} style={showChangeCards ? {backgroundColor:'#f5deb3'} : {}}>
            {showChangeCards ? 'Скрыть вкладку' : 'Сменить колоду'}
          </span>
          <span className="consultation-header-button">
            Закрыть сессию
          </span>
        </div>
          <div className="consultation-header-setCards-wrapper" style={showChangeCards ? {display:'block'} : {}}>
            <div className="consultation-header-setCards">
              {(!isLoading && isLoaded && data[0] !== "ERROR") ? userCardsJSX(data) : ''}     {/* // провреить условия */}
              {/* Еще варианты сюда */}
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
        {selectCards ? <ConsultationCards activeCards_id={selectCards}/> : ''}
    </div>
  )
}

export default connect(
  state => {
    return {
      userCards: selectUserCards(state)
    }
  },
  {
    getUserCards: getUserCards
  }
)(ConsultationContent)
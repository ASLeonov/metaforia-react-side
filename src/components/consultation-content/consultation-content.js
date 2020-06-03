import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {selectUserCards, selectUserSelectedCards} from '../../store/selectors/cards'
import {getUserCards} from '../../store/action-creators/cards-actions'
import {cardsJSX} from '../../functions/cards-box-jsx'
import ConsultationCards from './consultation-cards'
import Loader from '../loader'
import './consultation-content.css'

function ConsultationContent(props) {
  const [windowFullScreen, setWindowFullScreen] = useState(false)
  const [showChangeCards, setShowChangeCards] = useState(false)
  const [selectCards, setSelectCards] = useState(null)
  const {isLoaded, isLoading, data} = props.userCards

  let fetched

  const onSelectCardsClick = cardsBox_id => {
    props.userSelectedCards.activeCardsBox !== cardsBox_id && setSelectCards(cardsBox_id)
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

  // console.log('render Consultation content', isLoaded, isLoading, data)
  console.log(`render Consultation Content - ${!isLoaded && !isLoading ? 'Колоды не загружены' : ''}${!isLoaded && isLoading ? 'Колоды загружаются' : ''}${isLoaded && !isLoading ? 'Колоды загружены' : ''} Карты из колоды -> ${props.userSelectedCards.isLoaded} ${props.userSelectedCards.isLoading}`)

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
              {(showChangeCards && !isLoading && isLoaded && data[0] !== "ERROR") ? 
                cardsJSX(data, 'consult-mode-play', 'freeCards', onSelectCardsClick) : ''}
              {/* userCardsJSX(data, "consult-mode-play") : ''} */}
                {/* // провреить условия */}
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
  state => ({
      userCards: selectUserCards(state),
      userSelectedCards: selectUserSelectedCards(state)
  }),
  {
    getUserCards
  }
)(ConsultationContent)


// Надо решить проблему жуткого перерендеривания , которое возникает при подгрузке новых карт из выбранной новой колоды. 
// Пока главная мысль - тупо загрузить все карты из доступных колод, но не много ли..........
// Конечно, и при переключении на уже закачанную колоду есть лишний Consultation Content и всех его детей, но его я хотя бы замаскировал анимацией css... А при нескольких обновлениях store, все жутко моргает конечно.
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
  // const [position, setPosition] = useState([false, 250, 200, 0, 0])
  const [windowFullScreen, setWindowFullScreen] = useState(false)
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

  // const setDraggbleON = event => {
  //   const move_DOM = document.querySelector('.consultation-field-tmp').getBoundingClientRect()

  //   setPosition([true, position[1], position[2], event.clientX-move_DOM.left, event.clientY-move_DOM.top])
  // }

  // const setDraggbleOFF = () => {
  //   if (position[0]) setPosition([false, position[1], position[2], position[3], position[4]])
  // }

  // const changePositionMouseDown = event => {
  //   event.preventDefault()

  //   if (position[0]) {
  //     const field_DOM = document.querySelector('.consultation-field').getBoundingClientRect()

  //     const new_x = event.clientX-field_DOM.left-position[3] > 0 ? event.clientX-field_DOM.left-position[3] : 0 
  //     const new_y = event.clientY-field_DOM.top-position[4] > 0  ? event.clientY-field_DOM.top-position[4]  : 0 
  //     setPosition([true, new_x, new_y, position[3], position[4]])
  //   }
  // }

  const onChangeWindow = () => {
    setWindowFullScreen(!windowFullScreen)
  }

  const window_CN = windowFullScreen ? "consultation_large" : "consultation_low"

  return (
    <div className={window_CN}>
      <div className="consultation-header">
        <span title={windowFullScreen ? "Свернуть окно" : "В полноэкранный режим"} onClick={onChangeWindow}>{windowFullScreen ? 'x' : '▢'}</span>
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
        {selectCards ? <ConsultationCards cards_id={selectCards}/> : ''}
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
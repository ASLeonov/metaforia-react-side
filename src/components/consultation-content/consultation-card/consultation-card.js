import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {selectUser} from '../../../store/selectors/user'
import {selectUserSelectedCards, selectThisSessionCardsLocal} from '../../../store/selectors/cards'
import {saveCardThisSession, increaseThisSession} from '../../../store/action-creators/cards-actions'
import './consultation-card.css'

function ConsultationCard(props) {
  const [position, setPosition] = useState([false, 0, 0, 0, 0, 0, 0])
  // Двигаемся, left, top, расст по X до точки приложения, расст по Y до точки приложения, ширина, высота
  const [playMode, setPlayMode] = useState(false)
  const [isMove, setIsMove] = useState(false)
  const [scale, setScale] = useState(1)
  const {cards_id, cards_img, cards_name} = props.card

  const sendDataSocket = (thisScale) => {
    const send_data = {
      type:          'saveCardThisSession',
      cards_id,
      cards_name,
      cards_img, 
      position_left: position[1],
      position_top:  position[2],
      scale:         thisScale,
      session_id:    props.session_id,
      modificator:   props.user.type
    }
    props.socket.send(JSON.stringify(send_data))
  }

  const setDraggbleON = event => {    // Нажатие на карту - инициализация движения
    const move_DOM = document.querySelector(`#consultation-card-${cards_id}`).getBoundingClientRect()
    if (position[1] === 0 || position[2] === 0) {
      setPosition([true, move_DOM.left, move_DOM.top, event.clientX-move_DOM.left, event.clientY-move_DOM.top, move_DOM.width, move_DOM.height])
    } else {
      const tools_DOM = document.querySelector(`#cctools-${cards_id}`).getBoundingClientRect()
      if (event.clientY > tools_DOM.top+tools_DOM.height) { // Блокируем перемещение нажатием на tools
        setPosition([true, position[1], position[2], event.clientX-move_DOM.left, event.clientY-move_DOM.top, move_DOM.width, move_DOM.height])
      }
    }
  }

  const setDraggbleOFF = () => {    // Завершение движения
    const border_DOM = document.querySelector('.consultation-field').getBoundingClientRect()
    const move_DOM   = document.querySelector(`#consultation-card-${cards_id}`).getBoundingClientRect()
    if (position[0]) {
      if (move_DOM.bottom < border_DOM.bottom) {
        if (isMove) {
          !playMode && setPlayMode(true)
          setIsMove(false)
          props.increaseThisSession({cards_id, cards_name, cards_img}, position[1], position[2], scale)
          sendDataSocket(scale)
        }
      } else {
        setPosition([false, 0, 0, 0, 0, 0, 0])
      }
    }
  }

  const changePositionMouseDown = event => {    // Движение карты
    event.preventDefault()
    if (position[0]) {
      const border_DOM = document.querySelector('.consultation-field').getBoundingClientRect()
      if
        (
          border_DOM.left  < event.clientX-position[3] && 
          border_DOM.top   < event.clientY-position[4] && 
          border_DOM.right > event.clientX-position[3]+position[5]
        )
      {
        !isMove && setIsMove(true)
        setPosition([true, event.clientX-position[3], event.clientY-position[4], position[3], position[4], position[5], position[6]])
      }
    }
  }

  useEffect( () => {
    if (props.exist_card || props.exist_card_local) {   // Если карта уже выбрана в данной сессии
      if (position[0] || position[1] !== props.position_left || position[2] !== props.position_top) {
        setPosition([false, props.position_left, props.position_top, 0, 0, 0, 0])
      }
      scale !== props.scale && setScale(props.scale)
      !playMode && setPlayMode(true)
    }
    // eslint-disable-next-line
  }, [props.position_left, props.position_top, props.scale])

  const increaseScale = () => {
    if (scale < 2) {
      const new_scale = Number((scale + 0.2).toFixed(1))
      props.increaseThisSession({cards_id, cards_name, cards_img}, position[1], position[2], new_scale)
      sendDataSocket(new_scale)
    }
  }
  const decreaseScale = () => {
    if (scale > 1) {
      const new_scale = Number((scale - 0.2).toFixed(1))
      props.increaseThisSession({cards_id, cards_name, cards_img}, position[1], position[2], new_scale)
      sendDataSocket(new_scale)
    }
  }

  const img_width = 100*scale + 'px'
  const img_style = {width: img_width}

  const hideCard = () => {
    setPosition([false, -1000, -1000, position[3], position[4], position[5], position[6]])
    props.saveCardThisSession(cards_id, {cards_id: cards_id, cards_name: cards_name, cards_img: cards_img}, -1000, -1000, props.session_id)
  }

  const currentStyle = (position[1] !== 0 && position[2] !== 0) ?
    {
      position: 'fixed',
      left: position[1],
      top: position[2],
      // margin: '50px',
      ...img_style,
      ...props.style_1
    } : props.style_1

  // console.log('cons card scale =', props.scale, scale)

  return (
    <div
      onMouseMove={changePositionMouseDown}
      onMouseUp={setDraggbleOFF}
      // onMouseLeave={setDraggbleOFF}
      style={ (position[0] && isMove) ? {position:'fixed', top:'0', left:'0', bottom:'0', right:'0', zIndex:'1000', backgroundColor:'transparent'} : {} }
    >   
      <div 
        id={`consultation-card-${cards_id}`}
        className="consultation-card-wrapper" 
        style={currentStyle}
        onMouseDown={setDraggbleON} // включаем режим переноса карты кликом на этом блоке, остальные события обрабатываем на полноэкранном блоке выше, чтобы исключить соскакивания мыши
      >
        <div className="consultation-card-tools" id={`cctools-${cards_id}`} style={playMode ? {} : {height:'0'}}>
          <div>
            <span onClick={increaseScale} style={scale >= 2 ? {opacity: 0.1} : {}}>+</span>
            <span onClick={decreaseScale} style={scale <= 1 ? {opacity: 0.1} : {}}>-</span>
          </div>
          <span onClick={hideCard}>x</span>
        </div>
        <img
          src={`../images/cards-item/${cards_img}`}
          className="consultation-card"
          style={img_style}
          alt={`Карта «${cards_name}»`}
          title={`Карта «${cards_name}»`}
        />
      </div>
    </div>
  )
}

export default connect(
  state => ({
    user:                  selectUser(state),
    userSelectedCards:     selectUserSelectedCards(state),
    thisSessionCardsLocal: selectThisSessionCardsLocal(state)
  }),
  {
    saveCardThisSession, increaseThisSession
  }
)(ConsultationCard)
import React, {useState} from 'react'
import {connect} from 'react-redux'
import {selectThisSessionCards} from '../../../store/selectors/cards'
import {saveCardThisSession, setCardInUse} from '../../../store/action-creators'
import './consultation-card.css'

function ConsultationCard(props) {
  const [position, setPosition] = useState([false, 0, 0, 0, 0, 0, 0]) // Двигаемся, left, top, расст по X до точки приложения, расст по Y до точки приложения, ширина, высота
  const [playMode, setPlayMode] = useState(false)
  const [size, setSize] = useState(1)
  const {cards_id, cards_img, cards_name} = props.card    //cards_box, 

  const setDraggbleON = event => {
    const move_DOM = document.querySelector(`#consultation-card-${cards_id}`).getBoundingClientRect()
    if (position[1] === 0 || position[2] === 0) {
      setPosition([true, move_DOM.left, move_DOM.top, event.clientX-move_DOM.left, event.clientY-move_DOM.top, move_DOM.width, move_DOM.height])
    } else {
      setPosition([true, position[1], position[2], event.clientX-move_DOM.left, event.clientY-move_DOM.top, move_DOM.width, move_DOM.height])
    }
  }

  const setDraggbleOFF = () => {
    const border_DOM = document.querySelector('.consultation-field').getBoundingClientRect()
    const move_DOM = document.querySelector(`#consultation-card-${cards_id}`).getBoundingClientRect()
    if (position[0]) {
      if (move_DOM.bottom < border_DOM.bottom) {
        // setPlayMode(true)
        setPosition([false, position[1], position[2], position[3], position[4], position[5], position[6]])
        props.saveCardThisSession(
          cards_id,
          {cards_id: cards_id, cards_name: cards_name, cards_img: cards_img},   //cards_box: cards_box,
          position[1],
          position[2]
        )
        if (!props.thisSessionCards[cards_id]) {
          props.setCardInUse(cards_id)
        }
      } else {
        setPosition([false, 0, 0, 0, 0, 0, 0])
      }

    }
  }

  const changePositionMouseDown = event => {
    event.preventDefault()
    if (position[0]) {
      const border_DOM = document.querySelector('.consultation-field').getBoundingClientRect()
        if  ( border_DOM.left < event.clientX-position[3] && border_DOM.top < event.clientY-position[4] && border_DOM.right > event.clientX-position[3]+position[5] ) {
              // старый вариант - playmode, стоял всегда false и все работало && ( !playMode || (playMode && border_DOM.bottom > event.clientY-position[4]+position[6] ) ) ) {
          setPosition([true, event.clientX-position[3], event.clientY-position[4], position[3], position[4], position[5], position[6]])
        }
    }
  }

  if (props.exist_card && position[1] === 0 && position[2] === 0) {
    setPosition([false, props.position_left, props.position_top, 0, 0, 0, 0])
    setPlayMode(true)
  }

  const increaseSize = () => {
    if (size < 2) setSize(size + 0.2)
  }
  const decreaseSize = () => {
    if (size > 1) setSize(size - 0.2)
  }
  const img_width = 100*size + 'px'
  const img_style = {width: img_width}

  const hideCard = () => {
    setPosition([false, -1000, -1000, position[3], position[4], position[5], position[6]])
    props.saveCardThisSession(cards_id, {cards_id: cards_id, cards_name: cards_name, cards_img: cards_img}, -1000, -1000)
  }

  const currentStyle = (position[1] !== 0 && position[2] !== 0) ?
    {
      position: 'fixed',
      left: position[1],
      top: position[2],
      // margin: '50px',
      ...props.style_1
    } : props.style_1

  return (
    <div 
      id={`consultation-card-${cards_id}`}
      className="consultation-card-wrapper" 
      style={currentStyle}
      onMouseDown={setDraggbleON}
      onMouseUp={setDraggbleOFF} 
      onMouseMove={changePositionMouseDown} 
      onDragStart={()=>{return false}} 
      onMouseLeave={setDraggbleOFF}
    >
      <div className="consultation-card-tools" style={playMode ? {} : {height:'0'}}>
        <div>
          <span onClick={increaseSize} style={size >= 2 ? {opacity: 0.1} : {}}>+</span>
          <span onClick={decreaseSize} style={size <= 1 ? {opacity: 0.1} : {}}>-</span>
        </div>
        <span onClick={hideCard}>x</span>
      </div>
      <img
        src={`../images/cards-item/${cards_img}`}
        // id={`consultation-card-${cards_id}`}
        className="consultation-card"
        style={img_style}
        alt={`Карта «${cards_name}»`}
        title={`Карта «${cards_name}»`}
        // onMouseDown={setDraggbleON}
        // onMouseUp={setDraggbleOFF} 
        // onMouseMove={changePositionMouseDown} 
        // onDragStart={()=>{return false}} 
        // onMouseLeave={setDraggbleOFF}
      />
    </div>
  )
}

export default connect(
  state => {
    return {
      thisSessionCards: selectThisSessionCards(state)
    }
  },
  {
    saveCardThisSession: saveCardThisSession,
    setCardInUse: setCardInUse
  }
)(ConsultationCard)
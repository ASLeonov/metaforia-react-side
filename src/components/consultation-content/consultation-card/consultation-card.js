import React, {useState} from 'react'
import {connect} from 'react-redux'
import {selectThisSessionCards} from '../../../store/selectors/cards'
import {saveCardThisSession, setCardInUse} from '../../../store/action-creators'

function ConsultationCard(props) {
  const [playMode, setPlayMode] = useState(false)     // сейчас он всегда false - разобраться
  const [position, setPosition] = useState([false, 0, 0, 0, 0, 0, 0]) // Двигаемся, left, top, расст по X до точки приложения, расст по Y до точки приложения, ширина, высота
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
        setPosition([false, position[1], position[2], position[3], position[4], position[5], position[6]])
        if (!props.thisSessionCards[cards_id]) {
          props.saveCardThisSession(
            cards_id,
            {cards_id: cards_id, cards_name: cards_name, cards_img: cards_img},   //cards_box: cards_box,
            position[1],
            position[2]
          )
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
        if  ( border_DOM.left < event.clientX-position[3] && border_DOM.top < event.clientY-position[4] && 
              border_DOM.right > event.clientX-position[3]+position[5] && 
                ( !playMode || (playMode && border_DOM.bottom > event.clientY-position[4]+position[6] ) ) ) {
          setPosition([true, event.clientX-position[3], event.clientY-position[4], position[3], position[4], position[5], position[6]])
        }
    }
  }

  // if (!playMode && position[1] !== 0 && position[2] !==0) {
  //   const border_DOM = document.querySelector('.consultation-field').getBoundingClientRect()
  //   const move_DOM = document.querySelector(`#consultation-card-${cards_id}`).getBoundingClientRect()
  //   if (move_DOM.bottom < border_DOM.bottom) {
  //     setPlayMode(true)
  //   }
  // }

  if (props.exist_card && position[1] === 0 && position[2] === 0) {
    // console.log('---',props.exist_card)
    setPosition([false, props.position_left, props.position_top, 0, 0, 0, 0])
  }
  // console.log(props.position_left)

  const currentStyle = (position[1] !== 0 && position[2] !== 0) ?
    {
      position: 'fixed',
      left: position[1],
      top: position[2],
      // margin: '50px',
      ...props.style_1
    } : props.style_1

  return (
    <img
      src={`../images/cards-item/${cards_img}`}
      id={`consultation-card-${cards_id}`}
      className="consultation-card"
      alt={`Карта «${cards_name}»`}
      title={`Карта «${cards_name}»`}
      style={currentStyle}
      onMouseDown={setDraggbleON}
      onMouseUp={setDraggbleOFF} 
      onMouseMove={changePositionMouseDown} 
      onDragStart={()=>{return false}} 
      onMouseLeave={setDraggbleOFF}
    />
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
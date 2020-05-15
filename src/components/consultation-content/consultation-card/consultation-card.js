import React, {useState} from 'react'

function ConsultationCard(props) {
  const [position, setPosition] = useState([false, 0, 0, 0, 0])
  const {cards_id, cards_img, cards_name} = props.card

  const setDraggbleON = event => {
    if (position[1] === 0 || position[2] === 0) {
      const move_DOM = document.querySelector(`#consultation-card-${cards_id}`).getBoundingClientRect()
      // console.log(move_DOM)
      setPosition([true, move_DOM.left-35, move_DOM.top-35, 0, 0])
    } else {
      setPosition([true, position[1], position[2], 0, 0])
    }
  }

  const setDraggbleOFF = () => {
    if (position[0]) setPosition([false, position[1], position[2], 0, 0])
  }

  const changePositionMouseDown = event => {
    event.preventDefault()

    if (position[0]) {
      // const field_DOM = document.querySelector('.consultation-field').getBoundingClientRect()

      // const new_x = event.clientX-field_DOM.left-position[3] > 0 ? event.clientX-field_DOM.left-position[3] : 0 
      // const new_y = event.clientY-field_DOM.top-position[4] > 0  ? event.clientY-field_DOM.top-position[4]  : 0 
      setPosition([true, event.clientX-35, event.clientY-35, 0, 0])
    }
  }

  const currentStyle = (position[1] !== 0 && position[2] !== 0) ?
    {
      position: 'fixed',
      left: position[1],
      top: position[2],
      ...props.style_1
    } : props.style_1

    console.log(position)

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

export default ConsultationCard
import React from 'react'
import './alerts.css'

function Alerts(props) {

  const applyChanges = () => props.applyChanges()

  const discardChanges = () => props.discardChanges()

  return (
    <div className="confirm_wrapper">
      <div className="confirm">
        <div className="confirm_message">{`Вы уверены, что хотите ${props.confirmText}?`}</div>
        <div className="confirm_buttons">
          <button className="confirm_button" onClick={applyChanges}>
            Да
          </button>
          <button className="confirm_button" onClick={discardChanges}>
            Нет
          </button>
        </div>
      </div>
    </div>
  )
}

export default Alerts
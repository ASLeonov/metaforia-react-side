import React from 'react'
import {alerts} from '../../store/alerts'
import './alerts.css'

function Alerts(props) {
  const {applyChanges, discardChanges} = props
  const {messageType, direction, text} = props.data

  const comfirmCN     = direction === 'column' ? "confirm confirm_column" : "confirm"
  const confirmMsgCN  = direction === 'column' ? "confirm_message confirm_message_column" : "confirm_message"
  const confirmBtnsCN = direction === 'column' ? "confirm_buttons confirm_buttons_column" : "confirm_buttons"
  const confirmBtnCN  = direction === 'column' ? "confirm_button confirm_button_column"   : "confirm_button"

  // console.log('render alert')

  return (
    <div className={comfirmCN}>
      <div className={confirmMsgCN}>
        {alerts[text]}
      </div>
      <div className={confirmBtnsCN}>
        <button className={confirmBtnCN} onClick={applyChanges}>
          Да
        </button>
        {messageType !== 'notification' ?
          <button className={confirmBtnCN} onClick={discardChanges}>
            Нет
          </button> : ''
        }
      </div>
    </div>
  )
}

export default Alerts

// Варианты вывода сообщений:
// По типу. Уведомление (только кнопка ДА) или Подтверждение (кнопки ДА и НЕТ).
// По дизайну. Вертикальное или горизонтальное размещение элементов (текст и группа кнопок).
// В props приходят:
// 1) Объект data = {messageType, direction, text}.
//    - Тип сообщения -> messageType 'notification' если у нас уведомление (только кнопка ДА) или любое другое значение в противном случае.
//    - Вид вывода на экран -> direction 'column' если в столбик или любое другое в противном случае.
//    - text -> текст сообщения. 
// 2) Методы applyChanges и discardChanges -> подтвердить и отменить изменения соответственно.
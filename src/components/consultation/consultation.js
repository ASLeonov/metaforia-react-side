import React, {useState} from 'react'
import ConsultationContent from '../consultation-content'
import './consultation.css'

function Consultation(props) {
  const [windowFullScreen, setWindowFullScreen] = useState(false)

  const onChangeWindow = () => {
    setWindowFullScreen(!windowFullScreen)
  }

  const window_CN = windowFullScreen ? "consultation_large" : "consultation_low"

  return (
    <div className={window_CN}>
      <div className="consultation-header">
        <span onClick={onChangeWindow}>{windowFullScreen ? 'x' : '▢'}</span>
      </div>
      <ConsultationContent />
    </div>
  )
}

export default Consultation
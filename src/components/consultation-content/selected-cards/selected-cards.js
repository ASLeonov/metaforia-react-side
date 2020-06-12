import React, {useState, useEffect} from 'react'
import ConsultationCard from '../consultation-card'

function SelectedCards({session_id, activeCardsBox, data, thisSessionCards, thisSessionCardsLocal}) {
  const [xPosition, setXPosition] = useState(0)
  const [mixCards, setMixCards] = useState([0])
  const [dataJSX, setDataJSX] = useState([])
  const [dataKeys, setDataKeys] = useState({})
  const data_length = Object.keys(data).length

  const mixCardsClick = () => {
    setDataKeys({})
    setXPosition(0)
    setMixCards([mixCards[0] + 1])
  }

  const rightScrollClick = () => {
    const wrapper_element = document.querySelector('.consultation-cards-center-wrapper')
    wrapper_element && wrapper_element.scrollWidth > wrapper_element.clientWidth && setXPosition(xPosition + 1)
  }

  const leftScrollClick = () => {
    (xPosition > 0) && setXPosition(xPosition - 1)
  }

  const dataJSX_ = []
  const count = (arr, result = 0) => {
    for (let index = 0; index < arr.length; index++) {
      if (arr[index] !== undefined) result++      
    }
    return result  
  }

  useEffect ( () => {
    Object.keys(dataKeys).length > 0 && setDataKeys({})
    xPosition !==0 && setXPosition(0)
    setMixCards([0])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCardsBox])

  useEffect( () => {
    let keys = {}
    if (mixCards[0] > 0 && data_length > 0) {
      let i = 0
      if (Object.keys(dataKeys).length === 0) {
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const element = data[key]
              if (element.cards_box === activeCardsBox && !thisSessionCards[key] && !thisSessionCardsLocal[key]) {
                i++
                const style_1 = (i <= xPosition) ? {width:'0', margin:'0'} : {}
                  while (count(dataJSX_) < i) {
                    const randomNumber = Math.floor(Math.random() * (data_length + 1))
                      if (dataJSX_[randomNumber] === undefined) {
                        dataJSX_[randomNumber] =
                          <ConsultationCard
                            key={element.cards_id}
                            style_1={style_1}
                            card={element}
                            session_id={session_id}
                          />
                        keys[randomNumber] = key
                      }
                  }
              }
          }
        }
        setDataKeys(keys)
      } else {
        for (const key in dataKeys) {
          if (dataKeys.hasOwnProperty(key)) {
            const element = data[dataKeys[key]]
              if (element.cards_box === activeCardsBox && !thisSessionCards[dataKeys[key]] && !thisSessionCardsLocal[dataKeys[key]]) {
                i++
                const style_1 = (i <= xPosition) ? {width:'0', margin:'0'} : {}
                  dataJSX_.push(
                    <ConsultationCard
                      key={element.cards_id}
                      style_1={style_1}
                      card={element}
                      session_id={session_id}
                    />
                  )
                  console.log('dataJSX_', ' ', element.cards_id)
              }
          }
        }
      }
    } else if (mixCards[0] === 0 && data_length > 0) {
      let i = 0
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const element = data[key]
              if (element.cards_box === activeCardsBox && !thisSessionCards[key] && !thisSessionCardsLocal[key]) {
                i++
                const style_1 = (i <= xPosition) ? {width:'0', margin:'0'} : {}
                  dataJSX_.push(
                    <ConsultationCard
                      key={element.cards_id}
                      style_1={style_1}
                      card={element}
                      session_id={session_id}
                    />
                  )
              }
          }
        }
    }
    setDataJSX(dataJSX_)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mixCards, xPosition, thisSessionCardsLocal])

  console.log('render selected cards')

  return (
    <>
      <div className="consultation-cards-tools">
        <div className="consultation-cards-tools-item">
          <span onClick={mixCardsClick}>Перемешать карты</span>
        </div>
        <div className="consultation-cards-tools-item consultation-cards-tools-divider">
          <span>Случайная карта</span>
        </div>
      </div>
      <div className="consultation-cards-leftBtn" onClick={leftScrollClick}>
        <span>❮</span>
      </div>
      <div className="consultation-cards-center">
        <div className={"consultation-cards-center-wrapper"}>
          {dataJSX}
        </div>
      </div>
      <div className="consultation-cards-rightBtn" onClick={rightScrollClick}>
        <span>❯</span>
      </div>
    </>
  )
}

export default SelectedCards

// ...

// Здесь, конечно, не отпимально сделано, т.к. два есть два useEffect и компонента рендерится 3 раза при монтировании, плюс последний цикл дважды прогоняется и готовит jsx (возможно мемоизация поможет?)... Но это плата за гарантированный перерендереинг компоненты при изменении выбранной колоды, т.к. иначе она обновляется не всегда.
import React, {useState} from 'react'
import ConsultationCard from '../consultation-card'

function SelectedCards({session_id, activeCardsBox, data, thisSessionCards, thisSessionCardsLocal, mixCards}) {
  const [xPosition, setXPosition] = useState(0)
  const data_length = Object.keys(data).length

  const rightScrollClick = () => {
    const wrapper_element = document.querySelector('.consultation-cards-center-wrapper')
    wrapper_element && wrapper_element.scrollWidth > wrapper_element.clientWidth && setXPosition(xPosition + 1)
  }

  const leftScrollClick = () => {
    (xPosition > 0) && setXPosition(xPosition - 1)
  }

  const dataJSX = []
  const count = (arr, result = 0) => {
    for (let index = 0; index < arr.length; index++) {
      if (arr[index] !== undefined) result++      
    }
    return result  
  }

  if (data_length > 0) {
    let i = 0
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const element = data[key]
            if (element.cards_box === activeCardsBox && !thisSessionCards[key] && !thisSessionCardsLocal[key]) {
              i++
              const style_1 = (i <= xPosition) ? {width:'0', margin:'0'} : {}

                while (count(dataJSX) < i) {
                  const randomNumber = Math.floor(Math.random() * (data_length + 1))
                    if (dataJSX[randomNumber] === undefined) {
                      dataJSX[randomNumber] =
                        <ConsultationCard
                          key={element.cards_id}
                          style_1={style_1}
                          card={element}
                          session_id={session_id}
                        />
                    }
                }
                // dataJSX.push(
                //   <ConsultationCard
                //     key={element.cards_id}
                //     style_1={style_1}
                //     card={element}
                //     session_id={session_id}
                //   />
                // )
            }
        }
      }
  }

  // useEffect ( () => {
  //   (xPosition !== 0) && setXPosition(0)
  // }, [activeCardsBox])

  // console.log('render selected cards' , dataJSX, count(dataJSX))

  return(
    <>
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

// Всегда рандом ???
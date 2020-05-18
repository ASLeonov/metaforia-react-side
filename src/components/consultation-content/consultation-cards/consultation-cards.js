import React, {useState} from 'react'
import {connect} from 'react-redux'
import {selectUserSelectedCards, selectThisSessionCards} from '../../../store/selectors/cards'
import {getSelectedCardItems, addSelectedCardItems} from '../../../store/action-creators'
import ConsultationCard from '../consultation-card'
import Loader from '../../loader'
import './consultation-cards.css'

function ConsultationCards(props) {
  const [xPosition, setXPosition] = useState(0)
  const {isLoaded, isLoading, activeCardsBox, data} = props.userSelectedCards
  const thisSessionCards = props.thisSessionCards
  let fetched
  let fetched_already_exist = []

  const rightScrollClick = () => {
    const wrapper_element = document.querySelector('.consultation-cards-center-wrapper')
    if (wrapper_element.scrollWidth > wrapper_element.clientWidth) {
      setXPosition(xPosition + 1)
    }
  }

  const leftScrollClick = () => {
    (xPosition > 0) && setXPosition(xPosition - 1)
  }

  if (!isLoaded && !isLoading) {
    props.getSelectedCards(props.activeCards_id)
  }

  if (isLoading) {
    fetched = <Loader />
  } else if (isLoaded) {     //isLoaded
    if (props.activeCards_id !== activeCardsBox) {      // Если выбрана колода, к-я уже скачана ранее???
      props.addSelectedCards(props.activeCards_id)
    } else {
      if (!data["ERROR"]) {         // !data["ERROR"]    // тут думать

        for (const key in thisSessionCards) {
          if (thisSessionCards.hasOwnProperty(key)) {
            const element = thisSessionCards[key]
              fetched_already_exist.push(
                <ConsultationCard key={`exist-card-${key}`} style_1={{}} card={element.card} position_left={element.position_left} position_top={element.position_top} exist_card={true} />
              )
          }
        }

        if (Object.keys(data).length > 0) {
          let i = 0
          fetched = []
            for (const key in data) {
              if (data.hasOwnProperty(key)) {
                const element = data[key]
                  if (element.cards_box === activeCardsBox && !element.cardInUse) {
                    i++
                    const style_1 = (i <= xPosition) ? {width:'0', margin:'0'} : {}
                    fetched.push(
                      <ConsultationCard key={element.cards_id} style_1={style_1} card={element} />
                    )
                  }
              }
            }

        } else {
          // fetched = <Messages caption="message_freeCardsNone" />
        }
      } else {
        // fetched = <Messages caption="message_freeCardsError" />  // Ошибка, либо на перезагрузку, либо надо как-то стирать значение по ключу ERROR
      }
    }
  }

  // console.log('render CONS CARDS ')

  return (
    <div className="consultation-cards">
      <div className="consultation-cards-tools"></div>
      <div className="consultation-cards-leftBtn" onClick={leftScrollClick}></div>
      <div className="consultation-cards-center">
        <div className="consultation-cards-center-wrapper">
          {fetched}
          {fetched_already_exist}
        </div>
      </div>
        <div className="consultation-cards-rightBtn" onClick={rightScrollClick}></div>
    </div>
  )
}

export default connect(
  state => {
    return {
      userSelectedCards: selectUserSelectedCards(state),
      thisSessionCards: selectThisSessionCards(state)
    }
  },
  {
    getSelectedCards: getSelectedCardItems,
    addSelectedCards: addSelectedCardItems
  }
)(ConsultationCards)
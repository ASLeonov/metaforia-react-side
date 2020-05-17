import React, {useState} from 'react'
import {connect} from 'react-redux'
import {selectUserSelectedCards, selectThisSessionCards} from '../../../store/selectors/cards'
import {getSelectedCardItems, addSelectedCardItems} from '../../../store/action-creators'
import ConsultationCard from '../consultation-card'
import Loader from '../../loader'
import './consultation-cards.css'

function ConsultationCards(props) {
  const [xPosition, setXPosition] = useState(0)
  const {isLoaded, isLoading, data} = props.userSelectedCards
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
  } else if (isLoaded) {
    if (!data[props.activeCards_id]) {
      props.addSelectedCards(props.activeCards_id)
    } else {
      if (!data["ERROR"]) {             // тут думать


          // if (thisSessionCards.isExist && thisSessionCards.data.length > 0) {
          //   console.log('thisSessionCards.isExist && thisSessionCards.length > 0')
          //   fetched_already_exist = thisSessionCards.data.map(
          //     element => <ConsultationCard key={element.key} style_1={{}} card={element.card} position_left={element.position_left} position_top={element.position_top} />
          //   )
          // }

        const cards_already_exist = {...thisSessionCards}
        if (data[props.activeCards_id].length > 0) {
          let i = 0
          fetched = data[props.activeCards_id].map(
            element => {
              i++
              const style_1 = (i <= xPosition) ? {width:'0', margin:'0'} : {}
              if (cards_already_exist[element.cards_id]) {
                console.log(cards_already_exist)
                delete cards_already_exist[element.cards_id]
              }
              return (
                <ConsultationCard key={element.cards_id} style_1={style_1} card={element} />
              )
            } 
          )
          console.log(cards_already_exist)
          for (const key in cards_already_exist) {
            const element = cards_already_exist[key]
            fetched_already_exist.push(
              <ConsultationCard key={element.card.cards_id} style_1={{}} exist_card={element} card={element.card}/>
            )
            
          }
          // if (cards_already_exist.values) {
          //   fetched_already_exist = cards_already_exist.values.map(
          //     element => <ConsultationCard key={element.cards_id} style_1={{}} exist_card={element} />
          //   )
          // }
        } else {
          // fetched = <Messages caption="message_freeCardsNone" />
        }
      } else {
        // fetched = <Messages caption="message_freeCardsError" />  // Ошибка, либо на перезагрузку, либо надо как-то стирать значение по ключу ERROR
      }
    }
  }

  console.log('render CONS CARDS ')

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
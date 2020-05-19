import React, {useState} from 'react'
import {connect} from 'react-redux'
import {selectUserSelectedCards, selectThisSessionCards} from '../../../store/selectors/cards'
import {getSelectedCardItems, addSelectedCardItems} from '../../../store/action-creators'
import {getCardsThisSession} from '../../../store/action-creators/cards-actions'
import ConsultationCard from '../consultation-card'
import Loader from '../../loader'
import './consultation-cards.css'

function ConsultationCards(props) {
  const [xPosition, setXPosition] = useState(0)
  const {isLoaded, isLoading, activeCardsBox, data} = props.userSelectedCards
  // const {isLoaded_thisSessionCards, isLoading_thisSessionCards, data_thisSessionCards} = props.thisSessionCards
  const thisSessionCards = props.thisSessionCards
  let fetched, fetched_already_exist

  const rightScrollClick = () => {
    const wrapper_element = document.querySelector('.consultation-cards-center-wrapper')
    if (wrapper_element.scrollWidth > wrapper_element.clientWidth) {
      setXPosition(xPosition + 1)
    }
  }

  const leftScrollClick = () => {
    (xPosition > 0) && setXPosition(xPosition - 1)
  }

  const userSelectedCardsJSX = () => {
    fetched = []
      if (Object.keys(data).length > 0) {
        let i = 0
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
      }
    return fetched
  }

  const thisSessionCardsJSX = () => {
    fetched_already_exist = []
      for (const key in thisSessionCards.data) {
        if (thisSessionCards.data.hasOwnProperty(key)) {
          const element = thisSessionCards.data[key]
            fetched_already_exist.push(
              <ConsultationCard
                key={`exist-card-${key}`}
                style_1={{}}
                card={element.card}
                position_left={element.position_left}
                position_top={element.position_top}
                exist_card={true}
              />
            )
        }
      }
    return fetched_already_exist
  }

  if (!isLoaded && !isLoading) {
    fetched = <Loader fullscreen={true} />
  }

  if (isLoaded) {
    if (!data["ERROR"]) {
      userSelectedCardsJSX()
    } else {}   // прописать errors...
  }

  // if (isLoading) {
  //   fetched = <Loader fullscreen={true} />
  // }

  if (!thisSessionCards.isLoaded && !thisSessionCards.isLoading) {
    props.getCardsThisSession()
  }

  if (thisSessionCards.isLoaded) {



    if (!isLoaded && !isLoading) {
      props.getSelectedCards(props.activeCards_id)
    } else if (isLoading) {
      fetched = <Loader fullscreen={true} />
    } else if (isLoaded) {
      if (!thisSessionCards.data["ERROR"]) {
        thisSessionCardsJSX()
      } else {}                                             // прописать errors...  
    }
  }

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
    addSelectedCards: addSelectedCardItems,
    getCardsThisSession: getCardsThisSession
  }
)(ConsultationCards)
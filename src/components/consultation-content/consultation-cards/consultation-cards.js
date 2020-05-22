import React, {useState} from 'react'
import {connect} from 'react-redux'
import {selectUserSelectedCards, selectThisSessionCards, selectThisSessionCardsLocal} from '../../../store/selectors/cards'
import {getSelectedCardItems, addSelectedCardItems} from '../../../store/action-creators'
import {getCardsThisSession} from '../../../store/action-creators/cards-actions'
import ConsultationCard from '../consultation-card'
import Loader from '../../loader'

import {api_path} from '../../../store/common'

import './consultation-cards.css'

function ConsultationCards(props) {
  const [xPosition, setXPosition] = useState(0)
  const {isLoaded, isLoading, activeCardsBox, data} = props.userSelectedCards
  const thisSessionCards = props.thisSessionCards
  const thisSessionCardsLocal = props.thisSessionCardsLocal
  let fetched, fetched_already_exist, local_already_exist

  console.log('render Cards ALL')

  if (isLoaded && thisSessionCards.isLoaded) {

  }

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
                if (element.cards_box === activeCardsBox && !thisSessionCards.data[key] && !thisSessionCardsLocal[key]) {     // !element.cardInUse
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
                scale={element.scale}
                exist_card={true}
              />
            )
        }
      }
    //return fetched_already_exist
  }

  const thisSessionCardsLocalJSX = () => {
    local_already_exist = []
        for (const key in thisSessionCardsLocal) {
          if (thisSessionCardsLocal.hasOwnProperty(key)) {
            const element = thisSessionCardsLocal[key]
            // console.log('thisSessionCardsLocalJSX', element.scale)
              local_already_exist.push(
                <ConsultationCard
                  key={`exist-card-local-${key}`}
                  style_1={{}}
                  card={element.card}
                  position_left={element.position_left}
                  position_top={element.position_top}
                  scale={element.scale}
                  exist_card_local={true}
                />
              )
          }
        }
    return local_already_exist
  }

  if (!isLoaded && !isLoading) {
    fetched = <Loader fullscreen={true} />
  }

  if (isLoaded) {
    if (!data["ERROR"]) {
      userSelectedCardsJSX()
    } else {}   // прописать errors...
  }

  if (!thisSessionCards.isLoaded && !thisSessionCards.isLoading) {
    props.getCardsThisSession()
  }

  if (thisSessionCards.isLoaded) {
    if ( (!isLoaded && !isLoading) ) { 
      props.getSelectedCards(props.activeCards_id)
    } else if (isLoading) {
      fetched = <Loader fullscreen={true} />
    } else if (isLoaded) {

        if (activeCardsBox !== props.activeCards_id) {
          props.addSelectedCards(props.activeCards_id)
        } else {
          if (!thisSessionCards.data["ERROR"]) {

              let timerId = setTimeout(function tick() {
                fetch(`${api_path}cards.php?name=tanyaleo81@yandex.ru&type=synchro`)
                .then(response => response.text())
                .then(data => {
                  if (data === 'UPDATE_IS_NO_NEEDED') {
                    console.log('synchro -> UPDATE_IS_NO_NEEDED')
                      timerId = setTimeout(tick, 5000);
                  } else if (data === 'UPDATE_IS_NEEDED') {
                    console.log('synchro -> UPDATE_IS_NEEDED')
                    props.getCardsThisSession()
                  }
                })
                .catch(err => console.log('error', err))
              }, 5000)

            thisSessionCardsJSX()
            thisSessionCardsLocalJSX()
          } else {}   // прописать errors...  
        }
    }
  }

 
  
  return (
    <div className="consultation-cards">
      <div className="consultation-cards-tools">
        <div className="consultation-cards-tools-item">
          <span>Перемешать карты</span>
        </div>
        <div className="consultation-cards-tools-item consultation-cards-tools-divider">
          <span>Случайная карта</span>
        </div>
      </div>
      <div className="consultation-cards-leftBtn" onClick={leftScrollClick}>
        <span>❮</span>
      </div>
      <div className="consultation-cards-center">
        <div className="consultation-cards-center-wrapper">
          
          {/* {(fetched_already_exist && fetched_already_exist.length===4) ? 
            fetched_already_exist.map(element => (
              <ConsultationCard 
                key={element.key}
                style_1={{}}
                card={element.card}
                position_left={element.position_left}
                position_top={element.position_top}
                scale={element.scale}
                exist_card={true}
              />
            )) : "-----------------------------------------"} */}

          {local_already_exist}
          {fetched_already_exist}
          {fetched}
        </div>
      </div>
      <div className="consultation-cards-rightBtn" onClick={rightScrollClick}>
        <span>❯</span>
      </div>
    </div>
  )
}

export default connect(
  state => {
    return {
      userSelectedCards: selectUserSelectedCards(state),
      thisSessionCards: selectThisSessionCards(state), 
      thisSessionCardsLocal: selectThisSessionCardsLocal(state)
    }
  },
  {
    getSelectedCards: getSelectedCardItems,
    addSelectedCards: addSelectedCardItems,
    getCardsThisSession: getCardsThisSession,
  }
)(ConsultationCards)
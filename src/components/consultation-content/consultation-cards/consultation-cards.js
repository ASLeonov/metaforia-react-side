import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {selectUserSelectedCards, selectThisSessionCards, selectThisSessionCardsLocal} from '../../../store/selectors/cards'
import {selectThisSession} from '../../../store/selectors/sessions'
import {getSelectedCardItems, addSelectedCardItems} from '../../../store/action-creators'
import {getCardsThisSession} from '../../../store/action-creators/cards-actions'
import {setThisSession} from '../../../store/action-creators/sessions-actions'
import ConsultationCard from '../consultation-card'
import Loader from '../../loader'

import {api_path} from '../../../store/common'

import './consultation-cards.css'

function ConsultationCards(props) {
  const [xPosition, setXPosition] = useState(0)
  const [timer, setTimer] = useState(0)
  const {isLoaded, isLoading, activeCardsBox, data} = props.userSelectedCards
  const thisSessionCards = props.thisSessionCards
  const thisSessionCardsLocal = props.thisSessionCardsLocal
  let fetched, fetched_already_exist, local_already_exist

  // console.log('render Cards ALL')

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
  }

  const thisSessionCardsLocalJSX = () => {
    local_already_exist = []
        for (const key in thisSessionCardsLocal) {
          if (thisSessionCardsLocal.hasOwnProperty(key)) {
            const element = thisSessionCardsLocal[key]
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



            thisSessionCardsJSX()
            thisSessionCardsLocalJSX()
          } else {}   // прописать errors...  
        }
    }
  }

  useEffect( () => {

    console.log('useEffect', isLoaded, thisSessionCards.isLoaded)

    if (isLoaded && thisSessionCards.isLoaded && !isLoading && !thisSessionCards.isLoading) {

      // console.log(props.thisSession.session_id, props.thisSession.last_version)
      
      const maxId = setInterval( () => {} )
        for(let i=0; i < maxId; i+=1) { 
          clearInterval(i);
        }

        let timerId = setInterval( () => {

          fetch(`${api_path}cards.php?name=tanyaleo81@yandex.ru&type=synchro&session_id=${props.thisSession.session_id}&changeValue=${props.thisSession.last_version}`)
          .then(response => response.text())
          .then(data => {

            if (data === 'UPDATE_IS_NO_NEEDED') {

              console.log(timerId, '-> UPDATE_IS_NO_NEEDED')     // timerId = setTimeout(tick, 7000); // рекурсивный вызов, если обновление не нужно
                
            } else if (data.includes('UPDATE_IS_NEEDED_')) {

              const str = 'UPDATE_IS_NEEDED_'

              console.log(data.slice(str.length))

              console.log(timerId, '-> UPDATE_IS_NEEDED')
              // clearInterval(timerId)
              props.getCardsThisSession()
              setTimeout( () => {
                props.setThisSession(props.thisSession.session_id, data.slice(str.length))
              }, 1100)
                 
              // подумать про промис тут, а то мало ли в какой последовательности что произойдет, или запихать setThisSession в getCardThisSession?
              
            }
            
          })

          .catch(err => console.log('error', err))
          
        }, 7000)

    }
  }, [props.thisSession.last_version])      // isLoaded - грузится последним, поэтому от него ставим зависимость      api_path

 
  
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
      thisSessionCardsLocal: selectThisSessionCardsLocal(state),
      thisSession: selectThisSession(state)
    }
  },
  {
    getSelectedCards: getSelectedCardItems,
    addSelectedCards: addSelectedCardItems,
    getCardsThisSession: getCardsThisSession,
    setThisSession: setThisSession
  }
)(ConsultationCards)
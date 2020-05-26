import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {selectUserSelectedCards, selectThisSessionCards, selectThisSessionCardsLocal} from '../../../store/selectors/cards'
import {selectThisSession} from '../../../store/selectors/sessions'
import {getSelectedCardItems, addSelectedCardItems, getCardsThisSession} from '../../../store/action-creators/cards-actions'
import {setThisSession} from '../../../store/action-creators/sessions-actions'
import SelectedCards from '../selected-cards'
import CardsThisSession from '../cards-this-session'
import CardsThisSessionLocal from '../cards-this-session-local'
import Loader from '../../loader'
import {api_path} from '../../../store/common'
import './consultation-cards.css'

function ConsultationCards(props) {
  const {thisSession, selectedCards, thisSessionCards, thisSessionCardsLocal} = props
  let fetched_selected, fetched_already_exist, local_already_exist

  if (!selectedCards.isLoaded && !selectedCards.isLoading) {
    props.getSelectedCards(props.activeCards_id)
  }

  if (!thisSessionCards.isLoaded && !thisSessionCards.isLoading) {
    props.getCardsThisSession()
  }

  if (selectedCards.isLoading || thisSessionCards.isLoading) {
    fetched_selected = <Loader fullscreen={true} />
  }
 
  if (selectedCards.isLoaded && thisSessionCards.isLoaded) {
    if (!selectedCards.data["ERROR"] && !thisSessionCards.data["ERROR"]) {
      if (selectedCards.activeCardsBox !== props.activeCards_id) {
        props.addSelectedCards(props.activeCards_id)
      } else {
        fetched_already_exist = 
          <CardsThisSession
            session_id={thisSession.session_id}
            thisSessionCards={thisSessionCards.data}
          />
        local_already_exist = 
          <CardsThisSessionLocal
            session_id={thisSession.session_id}
            thisSessionCardsLocal={thisSessionCardsLocal}
          />
        fetched_selected = 
          <SelectedCards
            session_id={thisSession.session_id}
            activeCardsBox={selectedCards.activeCardsBox}
            data={selectedCards.data}
            thisSessionCards={thisSessionCards.data}
            thisSessionCardsLocal={thisSessionCardsLocal}
          />
      }
    } else {
      // прописать errors...
    }
  }

  useEffect( () => {

    if (selectedCards.isLoaded && thisSessionCards.isLoaded && !selectedCards.isLoading && !thisSessionCards.isLoading) {
      const maxId = setInterval( () => {} )
        for (let i=0; i < maxId; i+=1) { 
          clearInterval(i)
        }
// Возможно здесь лучше рекурсивный setTimeOut? Что если сервер будет отвечать долго?
// Посыпятся потом ответы? Или что вообще будет?
      let timerId = setInterval( () => {    
        fetch(`${api_path}cards.php?name=tanyaleo81@yandex.ru&type=synchro&session_id=${thisSession.session_id}&changeValue=${thisSession.last_version}`)
        .then(response => response.text())
        .then(data => {

          if (data === 'UPDATE_IS_NO_NEEDED') {

            console.log(timerId, '-> UPDATE_IS_NO_NEEDED')     // timerId = setTimeout(tick, 7000); // рекурсивный вызов, если обновление не нужно
              
          } else if (data.includes('UPDATE_IS_NEEDED_')) {

            const str = 'UPDATE_IS_NEEDED_'

            console.log(data.slice(str.length))

            console.log(timerId, '-> UPDATE_IS_NEEDED')
            props.clearCardThisSessionLocal()
            props.getCardsThisSession()
            setTimeout( () => {
              props.setThisSession(thisSession.session_id, data.slice(str.length))
            }, 1100)
            // подумать про промис тут, а то мало ли в какой последовательности что произойдет, или запихать setThisSession в getCardThisSession?
            // также не реализована перезагрузка колоды - вдруг смена колоды?              
          }
          
        })
        .catch(err => console.log('error', err))
      }, 7000)
    }
  }, [selectedCards.isLoaded, thisSession.last_version]) // selectedCards.isLoaded - грузится последним
 
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
      {local_already_exist}
      {fetched_already_exist}
      {fetched_selected}
    </div>
  )
}

export default connect(
  state => {
    return {
      selectedCards: selectUserSelectedCards(state),
      thisSessionCards: selectThisSessionCards(state), 
      thisSessionCardsLocal: selectThisSessionCardsLocal(state),
      thisSession: selectThisSession(state)
    }
  },
  {
    getSelectedCards: getSelectedCardItems,
    addSelectedCards: addSelectedCardItems,
    getCardsThisSession,
    setThisSession,
  }
)(ConsultationCards)
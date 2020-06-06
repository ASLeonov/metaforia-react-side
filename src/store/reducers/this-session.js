export const thisSessionReducer = (
    thisSessionState = {
      session_id: null,
      last_version: null,
      cardsThisSession: {},
      cardsThisSessionLocal: {}
    }, action) => {  
      switch (action.type) {
        case 'SET_THIS_SESSION': {
          console.log('SET_THIS_SESSION')
          return {
            session_id: action.payload.session_id,
            last_version: Number(action.payload.last_version),
            cardsThisSession: {...thisSessionState.cardsThisSession},
            cardsThisSessionLocal: {...thisSessionState.cardsThisSessionLocal}
          }
        }
        case 'INCREASE_THIS_SESSION': {
          console.log('INCREASE_THIS_SESSION')
          const new_version = thisSessionState.last_version + 1
          const {card, position_left, position_top, scale} = action.payload
          if (thisSessionState.cardsThisSession.data[card.cards_id]) {
            const new_cards_modificate = {
              ...thisSessionState.cardsThisSession
            }
              new_cards_modificate.data[card.cards_id] = {
                card: card,
                position_left: position_left,
                position_top: position_top,
                scale: scale
              }
                return {
                  session_id: thisSessionState.session_id,
                  last_version: new_version,
                  cardsThisSession: {
                    ...new_cards_modificate
                  },
                  cardsThisSessionLocal: {
                    ...thisSessionState.cardsThisSessionLocal
                  }
                }
          } else {
            const new_cards_modificate = {
              ...thisSessionState.cardsThisSessionLocal
            }
              new_cards_modificate[card.cards_id] = {
                card: card,
                position_left: position_left,
                position_top: position_top,
                scale: scale
              }
                return {
                  session_id: thisSessionState.session_id,
                  last_version: new_version,
                  cardsThisSession: {
                    ...thisSessionState.cardsThisSession
                  },
                  cardsThisSessionLocal: {
                    ...new_cards_modificate
                  }
                }
          }
        }
        case 'CLEAR_THIS_SESSION': {
          console.log('CLEAR_THIS_SESSION')
          return {
            session_id: null,
            last_version: null,
            cardsThisSession: {},
            cardsThisSessionLocal: {}
          }
        }

        case 'GET_CARDS_THIS_SESSIONS__LOADING': {
          console.log('GET_CARDS_THIS_SESSIONS__LOADING')
          return {
            session_id: thisSessionState.session_id,
            last_version: thisSessionState.last_version,
            cardsThisSession: {
              isLoaded: false,
              isLoading: true,
              data: {}
            },
            cardsThisSessionLocal: {}
          }
        }
        case 'GET_CARDS_THIS_SESSIONS__SUCCESS': {
          console.log('GET_CARDS_THIS_SESSIONS__SUCCESS')
          const data_new = {}                       //...thisSessionState.data
            action.response.forEach(element => {
              data_new[element.cards_id] = {
                card: {
                  cards_id:   element.cards_id,
                  cards_name: element.cards_name,
                  cards_img:  element.cards_img,
                },
                position_left:  element.position_left,
                position_top:   element.position_top,
                scale:          element.scale
              }
            })
          return {
            session_id: thisSessionState.session_id,
            last_version: thisSessionState.last_version,
            cardsThisSession: {
              isLoaded: true,
              isLoading: false,
              data: {...data_new}
            },
            cardsThisSessionLocal: {}
          }
        }
        case 'GET_CARDS_THIS_SESSIONS__FAILED': {
          console.log('GET_CARDS_THIS_SESSIONS__FAILED')
          return {
            session_id: thisSessionState.session_id,
            last_version: thisSessionState.last_version,
            cardsThisSession: {
              isLoaded: true,
              isLoading: false,
              data: {"ERROR": action.error}
            },
            cardsThisSessionLocal: {}
          }
        }
        
        case 'CLEAR_ALL_CARDS_THIS_SESSION': {
          console.log('CLEAR_ALL_CARDS_THIS_SESSION')
          return {
            session_id: thisSessionState.session_id,
            last_version: thisSessionState.last_version,
            cardsThisSession: {
              isLoaded: false,
              isLoading: false,
              data: {}
            },
            cardsThisSessionLocal: {}
          }
        }
        default: {
          return {
            ...thisSessionState
          }
        }
      }
  }
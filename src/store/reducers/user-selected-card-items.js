export const userSelectedCardReducer = 
  (
    userSelectedCardItemsState = { isLoaded: false, isLoading: false, activeCardsBox: false, cardBoxes: {}, data: {} },
    action
  ) => {
// ---------------------------- А не замутить ли иммутабле ??? Типа объект в объекте и все такое...
    switch (action.type) {
      case 'ADD_SELECTED_CARD_ITEMS': {
        console.log('ADD_SELECTED_CARD_ITEMS')
        const new_cardBoxes = userSelectedCardItemsState.cardBoxes[action.payload.cardsBox_id]
        const isLoaded_new = new_cardBoxes === undefined ? false : true
        const activeCardsBox_new = isLoaded_new ===  true ? action.payload.cardsBox_id : userSelectedCardItemsState.activeCardsBox
        return {
          isLoaded: isLoaded_new,
          isLoading: false,
          activeCardsBox: activeCardsBox_new,
          cardBoxes: {...userSelectedCardItemsState.cardBoxes},
          data: {...userSelectedCardItemsState.data}
        }
      }
      case 'GET_SELECTED_CARD_ITEMS__LOADING': {
        console.log('GET_SELECTED_CARD_ITEMS__LOADING')
        return {
          isLoaded: false,
          isLoading: true,
          activeCardsBox: false,
          cardBoxes: {...userSelectedCardItemsState.cardBoxes},
          data: {...userSelectedCardItemsState.data}
        }
      }
      case 'GET_SELECTED_CARD_ITEMS__SUCCESS': {
        console.log('GET_SELECTED_CARD_ITEMS__SUCCESS')
        const data_new = {...userSelectedCardItemsState.data}
        delete data_new["ERROR"] // Если ранее была ошибка, нужно ее стереть
          action.response.forEach(element => {
            data_new[element.cards_id] = {
              cards_id: element.cards_id,
              cards_box: element.cards_box,
              cards_name: element.cards_name,
              cards_img: element.cards_img,
            }
          })
        const cardBoxes_new = {...userSelectedCardItemsState.cardBoxes}
          cardBoxes_new[action.response[0].cards_box] = ""
        return {
          isLoaded: true,
          isLoading: false,
          activeCardsBox: action.response[0].cards_box,
          cardBoxes: {...cardBoxes_new},
          data: {...data_new}
        }
      }
      case 'GET_SELECTED_CARD_ITEMS__FAILED': {
        console.log('GET_SELECTED_CARD_ITEMS__FAILED')
        // В случае ошибки загрузки карт колоды, обнуляем все предыдущие загрузки и настройки.
        // Это надо для корректной работы <ConsultationCards /> при обратботке ошибки.
        return {
          isLoaded: true,
          isLoading: false,
          activeCardsBox: false,
          cardBoxes: {},
          data: {"ERROR": 'err'}
        }
      }
      case 'CLEAR_SELECTED_CARD_ITEMS': {
        return {
          isLoaded: false,
          isLoading: false,
          activeCardsBox: false,
          cardBoxes: {},
          data: {}
        }
      }
      default: {
        return {
          ...userSelectedCardItemsState
        }
      }
    }
  }
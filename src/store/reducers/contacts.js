export const contactsReducer = (contactsState = {isLoaded: false, isLoading: false, data: []}, action) => {
  switch (action.type) {
    case 'GET_CONTACTS__LOADING': {
      console.log('GET_CONTACTS__LOADING')
      return {
        isLoaded: false,
        isLoading: true,
        data: []
      }
    }
    case 'GET_CONTACTS__SUCCESS': {
      console.log('GET_CONTACTS__SUCCESS')
      return {
        isLoaded: true,
        isLoading: false,
        data: [...action.response]
      }
    }
    case 'GET_CONTACTS__FAILED': {
      return {
        isLoaded: true,
        isLoading: false,
        data: ["ERROR", action.error]
      }
    }
    default: {
      return {
        ...contactsState
      }
    }
  }
}
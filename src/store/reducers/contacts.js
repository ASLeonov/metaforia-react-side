export const contactsReducer = (contactsState = {isLoaded: false, data: []}, action) => {
  switch (action.type) {
    case 'GET_CONTACTS__SUCCESS': {
      return {
        isLoaded: true,
        data: [...action.response]
      }
    }
    case 'GET_CONTACTS__FAILED': {
      return {
        isLoaded: true, 
        data: ["ERROR"]
      }
    }
    default: {
      return {
        ...contactsState
      }
    }
  }
}
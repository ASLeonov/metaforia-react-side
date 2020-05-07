export const userReducer = (userState = {login: "", name: ""}, action) => {
  // console.log('userReducer')
  switch (action.type) {
    case 'GET_USER': {
      return {
        login: "tanyaleo81@yandex.ru",
        name: "Татьяна Леонова"
      }
    }
    default: {
      return {...userState}
    }
  }
}
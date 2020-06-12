export const userReducer = 
(
  userState = {login: "", name: "", fullname: "", surname: "", spec: false},
  action
) => {
  switch (action.type) {
    case 'LOGIN_OK': {
      return {
        login: action.response.user_login,
        name: action.response.user_name,
        surname: action.response.user_surname,
        fullname: `${action.response.user_name} ${action.response.user_surname}`,
        spec: action.response.user_spec === '1' ? true : false
      }
    }
    case 'LOGIN_ERROR': {
      return {
        login: 'BAD_LOGIN',
        name: '',
        surname: '',
        fullname: '',
        spec: false
      }
    }
    case 'LOGOUT': {
      return {
        login: '',
        name: '',
        surname: '',
        fullname: '',
        spec: false
      }
    }
    default: {
      return {...userState}
    }
  }
}
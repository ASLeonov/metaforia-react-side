export const userReducer = 
(
  userState = {login: "", name: "", fullname: "", surname: "", type: ""},
  action
) => {
  switch (action.type) {
    case 'LOGIN_OK': {
      return {
        login: action.response.user_login,
        name: action.response.user_name,
        surname: action.response.user_surname,
        fullname: `${action.response.user_name} ${action.response.user_surname}`,
        type: action.response.user_spec === '1' ? 'master' : 'slave'
      }
    }
    case 'LOGIN_ERROR': {
      return {
        login: 'BAD_LOGIN',
        name: '',
        surname: '',
        fullname: '',
        type: ''
      }
    }
    case 'LOGOUT': {
      return {
        login: '',
        name: '',
        surname: '',
        fullname: '',
        type: ''
      }
    }
    default: {
      return {...userState}
    }
  }
}
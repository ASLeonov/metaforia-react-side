export const userReducer = 
(
  userState = {login: "", name: "", fullname: "", surname: "", type: "", token: ""},
  action
) => {
  switch (action.type) {
    case 'LOGIN_OK': {
      return {
        login: action.response.user_login,
        name: action.response.user_name,
        surname: action.response.user_surname,
        fullname: `${action.response.user_name} ${action.response.user_surname}`,
        type: action.response.user_spec === '1' ? 'master' : 'slave',
        token: '123'
      }
    }
    case 'LOGIN_ERROR': {
      return {
        login: 'BAD_LOGIN',
        name: '',
        surname: '',
        fullname: '',
        type: '',
        token: ''
      }
    }
    case 'LOGOUT': {
      return {
        login: '',
        name: '',
        surname: '',
        fullname: '',
        type: '',
        token: ''
      }
    }
    default: {
      return {...userState}
    }
  }
}
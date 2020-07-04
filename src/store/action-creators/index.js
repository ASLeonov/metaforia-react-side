export const getContacts = () => (dispatch, getState) => {
  const user_login = getState().user.login
  const user_tools = getState().user.tools
  dispatch({
    type: 'GET_CONTACTS__LOADING'
  })
  fetch(`/api/clients?user_login=${user_login}&user_tools=${user_tools}`)
    .then(res => res.json())
    .then(res =>
      dispatch({
        type: 'GET_CONTACTS__SUCCESS',
        response: res,
      })
    )
    .catch(error => {
      dispatch({
        type: 'GET_CONTACTS__FAILED',
        error,
      })
    })
}
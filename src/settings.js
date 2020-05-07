// settings for fetch address
// const proxyApi_CORS = 'https://cors-anywhere.herokuapp.com/'
export const api_path = window.location.hostname !== "localhost" ?
  'http://metaforia-react-side.leonovlab.ru/api/' : 'http://localhost/ll/'

  export const dev_mode = window.location.hostname === "localhost" ? true : false
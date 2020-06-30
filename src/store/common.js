export const api_path = 
  process.env.NODE_ENV === 'production' ?
    'http://metaforia-react-side.leonovlab.ru/api/' : 
      'http://localhost/ll/'

const port = process.env.PORT || 8080
export const websocket_path = 
  process.env.NODE_ENV === 'production' ?
    `ws://leonovlab.online:${port}` : 
      `ws://localhost:${port}`

// window.location.hostname !== "localhost"
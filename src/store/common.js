export const api_path = window.location.hostname !== "localhost" ?
  'http://metaforia-react-side.leonovlab.ru/api/' : 'http://localhost/ll/'

  export const websocket_path = window.location.hostname !== "localhost" ?
  'ws:http://leonovlab.online' : 'ws://localhost:8080'
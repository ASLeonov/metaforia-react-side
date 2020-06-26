import useWebSocket from 'react-use-websocket'

function SocketController(props) {

  const {sendJsonMessage} = 
    useWebSocket('ws://localhost:8080', {
      onOpen: () => sendJsonMessage({user: props.user_login, session: props.session_id}),
      onMessage: e => {
        if (String(props.version) === String(e.data)) {
          console.log('current version -> ok')
        } else {
          console.log('current version -> bad')
        }
      },
      shouldReconnect: (closeEvent) => true,
    })

  console.log('render SocketController')

  return null
}

export default SocketController
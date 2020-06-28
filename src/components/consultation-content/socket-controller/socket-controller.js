import useWebSocket from 'react-use-websocket'
import {websocket_path} from '../../../store/common'

function SocketController(props) {

  const {sendJsonMessage} = 
    useWebSocket(websocket_path, {
      onOpen: () => sendJsonMessage({user: props.user_login, session: props.session_id}),
      onMessage: e => {
        if (String(props.version) === String(e.data)) {
          console.log('current version -> ok ->',  String(props.version), '===', String(e.data))
        } else {
          console.log('current version -> bad ->', String(props.version), '!==', String(e.data))
        }
      },
      shouldReconnect: (closeEvent) => true,
    })

  // console.log('render SocketController')

  return null
}

export default SocketController
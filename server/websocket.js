const WebSocket = require('ws')
const mysql = require('mysql2')
const config = require('config')

const port = process.env.PORT || 8080
const wss = new WebSocket.Server({ port: port })
const dbConfig = config.get('dbConfig')

// console.log('websocket dbConfig', dbConfig)

wss.on('connection', ws => {
  const connection = mysql.createConnection(dbConfig)
  let timer
  ws.on('message', message => {
    const client_data = JSON.parse(message)
    if (client_data.type === 'initialMessage') {
      timer = setInterval( () => {
        const query = `
          SELECT last_version, last_modificator 
          FROM   sessions
          WHERE  session_id = ${client_data.session}`
        connection.query(
          query,
          (err, results) => {
            if (err) { console.log('err', err) }
            else {
              const send_data = {
                type:             'SYNCHRO',
                last_version:     results[0].last_version,
                last_modificator: results[0].last_modificator
              }
              results.length === 1 && ws.send(JSON.stringify(send_data))
            }
          }
        )
      }, 7000)
    } else {
      console.log(client_data.type)
      const {session_id, modificator, cards_id, cards_name, cards_img, position_left, position_top, scale} = client_data
      const query_checkExist = `
        SELECT cards_id
        FROM   sessions_cards
        WHERE  cards_id = '${cards_id}'
        AND    session_id = ${session_id}`
      let promise = new Promise((resolve, reject) => {
        connection.query(
          query_checkExist,
          (err, results) => {
            if (!err) {
              if (results.length > 0) {
                resolve('good - card allready exist')
                console.log('good - card allready exist')
              } else {
                reject('good - card not exist')
                console.log('good - card not exist')
              }
            }
          }
        )
      })
      promise.then(
        () => {
          const query_cards = `
            UPDATE sessions_cards AS sc, sessions AS s 
            SET    sc.position_left = ${position_left}, sc.position_top = ${position_top}, sc.scale = ${scale}, 
                   s.last_version = s.last_version+1, s.last_modificator = '${modificator}' 
            WHERE  sc.session_id = ${session_id} 
            AND    sc.session_id = s.session_id 
            AND    sc.cards_id   = '${cards_id}'`
          const msg = {
            type: 'SAVE_CARD',
            body: 'INSERT_CARD_THIS_SESSION'}
          connection.query(
            query_cards,
            (err, results) => {
              if (!err) {
                ws.send(JSON.stringify(msg))
              } else {
                ws.send(JSON.stringify({type: 'SAVE_EXIST_CARD_ERROR'}))
              }
            }
          )
        },
        () => {
          const query_cards = `
            INSERT INTO sessions_cards 
            VALUES (null, ${session_id}, '${cards_id}', '${cards_name}', '${cards_img}', ${position_left}, ${position_top}, ${scale})`
          const msg = 'INSERT_CARD_THIS_SESSION'
        }
      )
    
    }

  })
  ws.on('close', () => {
    connection.destroy()
    timer && clearInterval(timer)
  })
})

// pm2 start npm -- run wsx
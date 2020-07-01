const WebSocket = require('ws')
const mysql = require('mysql2')
const config = require('config')

const port = process.env.PORT || 8080
const wss = new WebSocket.Server({ port: port })
const dbConfig = config.get('dbConfig')

console.log('websocket dbConfig', dbConfig)

wss.on('connection', ws => {
  const connection = mysql.createConnection(dbConfig)
  let timer
  ws.on('message', message => {
    const client_data = JSON.parse(message)
      timer = setInterval( () => {
        const query = `
          SELECT \`last_version\`, \`last_modificator\` 
          FROM \`${client_data.user}__sessions\`
          WHERE \`session_id\` = ${client_data.session}`
        connection.query(
          query,
          (err, results) => {
            if (err) { console.log('err', err) }
            else {
              const send_data = {
                last_version:     results[0].last_version,
                last_modificator: results[0].last_modificator
              }
              results.length === 1 && ws.send(JSON.stringify(send_data))
            }
          }
        )
      }, 7000)
  })
  ws.on('close', () => {
    connection.destroy()
    timer && clearInterval(timer)
  })
})

// pm2 start npm -- run wsx
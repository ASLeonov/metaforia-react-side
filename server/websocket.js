// const express = require('express')
const mysql = require('mysql2')
const WebSocket = require('ws')
const config = require('config')

// const app = express()
const port = process.env.PORT || 8080
const wss = new WebSocket.Server({ port: port })
const dbConfig = config.get('dbConfig')

console.log('work type =', process.env.NODE_ENV)
console.log('dbConfig =', dbConfig)
 
wss.on('connection', function connection(ws) {

  ws.on('message', function incoming(message) {
    const client_data = JSON.parse(message)
    const connection = mysql.createConnection(dbConfig)
    let timerId = setTimeout(function tick() {
      const query = `
        SELECT \`last_version\` 
        FROM \`${client_data.user}__sessions\` 
        WHERE \`session_id\` = ${client_data.session}`
      connection.query(
        query,
        (err, results, fields) => {
          ws.send(results[0].last_version)  // res.status(status).json(results)
        }
      )
      timerId = setTimeout(tick, 7000)
    }, 7000)
  })
})

// app.listen(port, () => console.log(`Server listening on port ${port}`))
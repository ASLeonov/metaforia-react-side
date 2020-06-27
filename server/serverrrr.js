const express = require('express')
// const bodyParser = require('body-parser')
// const path = require("path")
const mysql = require('mysql2')
// const api = require('./api')

const app = express()
const port = 3001
const WebSocket = require('ws')

// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*')
//   next()
// })
// app.use(bodyParser.json())
// app.use('/api', api)

 
const wss = new WebSocket.Server({ port: 8080 });
 
wss.on('connection', function connection(ws) {

  ws.on('message', function incoming(message) {
    const client_data = JSON.parse(message)
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'metaforia',
      password: ''
    })
    let timerId = setTimeout(function tick() {
      const query = `
        SELECT \`last_version\` 
        FROM \`${client_data.user}__sessions\` 
        WHERE \`session_id\` = ${client_data.session}`
      connection.query(
        query,
        (err, results, fields) => {
          // res.status(status).json(results)
          ws.send(results[0].last_version)
        }
      )
      timerId = setTimeout(tick, 7000)
    }, 7000)
  })
})

// app.use(express.static(path.join(__dirname, "build")))
// app.get('/', (req, res, next) => {
//   console.log('app.get 2')
//   res.sendFile(path.join(__dirname, "build", "index.html"))   //   res.send('Hello World!')
// })

app.listen(port, () => console.log(`Server listening on port ${port}`))
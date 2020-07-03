const express = require('express')
const bodyParser = require('body-parser')
const api = require('./api')

const app = express()
const port = 3001

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})
app.use(bodyParser.json())
app.use('/api', api)

app.listen(port, () => console.log(`Server listening on port ${port}`))
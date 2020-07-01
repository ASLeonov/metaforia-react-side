const express = require('express')
const bodyParser = require('body-parser')
// const router = require('express').Router()
// const path = require("path")
const mysql = require('mysql2')
const api = require('./api')

const app = express()
const port = 3001

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})
app.use(bodyParser.json())
app.use('/api', api)

// app.use(express.static(path.join(__dirname, "build")))
// app.get('/', (req, res, next) => {
//   console.log('app.get 2')
//   res.sendFile(path.join(__dirname, "build", "index.html"))   //   res.send('Hello World!')
// })

app.listen(port, () => console.log(`Server listening on port ${port}`))
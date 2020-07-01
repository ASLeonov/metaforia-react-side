const router = require('express').Router()
const mysql = require('mysql2')
const config = require('config')
const dbConfig = config.get('dbConfig')

console.log('api dbConfig', dbConfig)

const reply = (res, query, status = 200) => {
  const connection = mysql.createConnection(dbConfig)
  connection.query(
    query,
    (err, results, fields) => {
      res.status(status).json(results)
    }
  )
  connection.end()
}


router.get('/currentsessions', (req, res, next) => {
  const user_name = req.query.user_name
  const query = `
    SELECT * 
    FROM \`${user_name}__sessions\` 
    LEFT JOIN \`${user_name}__clients\` 
    ON \`${user_name}__sessions\`.session_client=\`${user_name}__clients\`.client_id 
    WHERE \`${user_name}__sessions\`.session_closed = 0`
  reply(res, query)
})

module.exports = router

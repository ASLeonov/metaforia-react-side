const router = require('express').Router()
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const config = require('config')
const dbConfig = config.get('dbConfig')
md5 = require('js-md5')

// console.log('api dbConfig', dbConfig)

const reply = (res, query, status = 200) => {
  const connection = mysql.createConnection(dbConfig)
  connection.query(
    query,
    (err, results) => {
      if (!err) {
        res.status(status).json(results)
      }
    }
  )
  connection.end()
}

router.post('/login', bodyParser.json(), (req, res, next) => {
  const {user_login, user_password} = req.body
  const query = `
    SELECT user_login, user_password, user_salt, user_name, user_surname, user_spec
    FROM users 
    WHERE user_login='${user_login}'`
  const connection = mysql.createConnection(dbConfig)
  connection.query(
    query,
    (err, results) => {
      if (!err) {
        result = results[0]
        if (md5(md5(user_password) + result.user_salt) === result.user_password) {
          res.status(200).json(result)
        } else {
          console.log('Login bad', result.user_password, md5(md5(user_password) + result.user_salt))
          // Прописать логику неправильного логина/пароля
        }
      } else {
        console.log('Err', err)
      }
    }
  )
  connection.end()
})

router.get('/currentsessions', (req, res, next) => {
  const user_login = req.query.user_login
  const query = `
    SELECT s.session_id, s.session_date, s.session_descr, c.client_name, c.client_surname
    FROM sessions AS s, clients AS c, users 
    WHERE users.user_login = '${user_login}' 
    AND s.session_client = c.client_id 
    AND s.session_closed = 0`
  reply(res, query)

  // Дописать логику для клиентов - свой запрос
})

router.get('/lastsessions', (req, res, next) => {
  const user_login = req.query.user_login
  const query = `
    SELECT s.session_id, s.session_date, s.session_descr, c.client_name, c.client_surname
    FROM sessions AS s, clients AS c, users 
    WHERE users.user_login = '${user_login}' 
    AND s.session_client = c.client_id 
    AND s.session_closed = 1`
  reply(res, query)
  // Дописать логику для клиентов - свой запрос
})

router.get('/usercards', (req, res, next) => {
  const user_login = req.query.user_login
  const query = `
    SELECT s.session_id, s.session_date, s.session_descr, c.client_name, c.client_surname
    FROM sessions AS s, clients AS c, users 
    WHERE users.user_login = '${user_login}' 
    AND s.session_client = c.client_id 
    AND s.session_closed = 1`
  reply(res, query)
})

module.exports = router
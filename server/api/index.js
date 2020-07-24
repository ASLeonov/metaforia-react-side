const router = require('express').Router()
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const config = require('config')
const dbConfig = config.get('dbConfig')
const {v4: uuidv4} = require('uuid')
const md5 = require('js-md5')

const reply = (res, query, msg, status = 200) => {
  const connection = mysql.createConnection(dbConfig)
  if (typeof query === 'string') {
    connection.query(
      query,
      (err, results) => {
        if (!err) {
          if (msg) {
            res.status(status).send(msg)
          } else {
            res.status(status).json(results)
          }
        } else {
          res.status(500).json({err: 'err'})
        }
      }
    )
  } else {
    let i = 0
    let send_data = []
    let promise = new Promise((resolve, reject) => {
      query.forEach(element => {
        connection.query(
          element,
          (err, results) => {
            if (!err) {
              i++
              send_data = send_data.concat(results)
              if (i === query.length) resolve("result")
            }
          }
        )
      })
    })
    promise.then( () => {
      res.status(status).json(send_data)
    })
  }
  connection.end()
}

router.post('/login', bodyParser.json(), (req, res, next) => {
  const {user_login, user_password, user_token} = req.body
  const connection = mysql.createConnection(dbConfig)
    if (user_token) {
      const query = `
        SELECT u.user_login, u.user_name, u.user_surname, u.user_spec, u.user_id AS user_tools
        FROM   users AS u, tokens AS t
        WHERE  u.user_id = t.user_id 
        AND    t.token='${user_token}'`
      connection.query(
        query,
        (err, results) => {
          if (!err) {
            if (results.length > 0) {
              result = results[0]
              const send_data = {
                user_login:   result.user_login,
                user_name:    result.user_name,
                user_surname: result.user_surname,
                user_spec:    result.user_spec,
                user_tools:   result.user_tools,
                user_token:   user_token
              }
              res.status(200).json(send_data)
            } else {
              res.status(200).json({'update_token': true})
            }

          } else {
            console.log('Err', err)
            res.status(200).json({'login_failed': true})

            // Может удалить токен, если results.length === 0 ???

          }
        }
      )
      connection.end()
    } else {
      const query = `
        SELECT user_login, user_password, user_salt, user_name, user_surname, user_spec, user_id AS user_tools
        FROM   users 
        WHERE  user_login='${user_login}'`
      const token = uuidv4()
      const send_data = {'login_failed': true}
      let promise = new Promise((resolve, reject) => {
        connection.query(
          query,
          (err, results) => {
            if (!err && results.length > 0) {
              result = results[0]
              if (md5(md5(user_password) + result.user_salt) === result.user_password) {
                send_data['user_login']   = result.user_login
                send_data['user_name']    = result.user_name
                send_data['user_surname'] = result.user_surname
                send_data['user_spec']    = result.user_spec
                send_data['user_tools']   = result.user_tools
                send_data['user_token']   = token
                delete send_data['login_failed']
                res.status(200).json(send_data)
                resolve(result.user_tools)
  
              } else { reject() }
            } else { reject() }
          }
        )
      })
      promise.then(
        data => {
          const query_addToken = `
          UPDATE tokens  
          SET    token   = '${token}' 
          WHERE  user_id = ${data}`
          connection.query(query_addToken)
          connection.end()
        },
        () => {
          res.status(200).json(send_data)
          connection.end()
        }
      )
    }
})

router.get('/currentsessions', (req, res, next) => {
  const user_id = req.query.user_tools
  const query = `
    SELECT s.session_id, s.session_date, s.session_descr, s.last_version, s.last_modificator,
           s.active_card_box, s.cards_side, c.client_name, c.client_surname
    FROM   sessions AS s, clients AS c
    WHERE  s.session_user   = ${user_id}
    AND    s.session_client = c.client_id 
    AND    s.session_closed = 0`
  reply(res, query)
  // Дописать логику для клиентов - свой запрос
})

router.get('/lastsessions', (req, res, next) => {
  const user_id = req.query.user_tools
  const query = `
    SELECT s.session_id, s.session_date, s.session_descr, c.client_name, c.client_surname
    FROM   sessions AS s, clients AS c 
    WHERE  s.session_user   = ${user_id} 
    AND    s.session_client = c.client_id 
    AND    s.session_closed = 1`
  reply(res, query)
  // Дописать логику для клиентов - свой запрос
})

router.get('/userscards', (req, res, next) => {
  const user_tools = req.query.user_tools
  const query = [
    `SELECT *
     FROM   allcards AS ac
     WHERE  ac.cards_type = 0`,
    `SELECT *
     FROM   allcards AS ac
     JOIN   userscards AS uc 
     ON     ac.cards_id = uc.cards_id 
     WHERE  uc.user_id = ${user_tools}`
  ]
  reply(res, query)
})

router.get('/clients', (req, res, next) => {
  const user_tools = req.query.user_tools
  const query = `
    SELECT   c.client_id, c.client_name, c.client_surname, c.client_gender, c.client_email, c.client_descr
    FROM     clients AS c
    WHERE    c.user_id = ${user_tools}
    ORDER BY c.client_name ASC`
  reply(res, query)
})

router.post('/editclient', bodyParser.json(), (req, res, next) => {
  const {client_id, client_name, client_surname, client_gender, client_email, client_descr, user_tools} = req.body
  const query = `
    UPDATE clients AS c
    SET    c.client_name = '${client_name}', c.client_surname = '${client_surname}', c.client_gender = '${client_gender}', 
           c.client_email = '${client_email}', c.client_descr='${client_descr}'
    WHERE  c.user_id = '${user_tools}' 
    AND    c.client_id = '${client_id}'`
  const msg = 'UPDATE_CLIENT'
  reply(res, query, msg)
})

router.post('/addclient', bodyParser.json(), (req, res, next) => {
  const {client_name, client_surname, client_gender, client_email, client_descr, user_tools} = req.body
  const query = `
    INSERT INTO clients
    VALUES (null, '${user_tools}', '${client_name}', '${client_surname}', '${client_gender}', '${client_email}', '${client_descr}')`
  const msg = 'INSERT_CLIENT'
  reply(res, query, msg)
})

router.delete('/deleteclient', bodyParser.json(), (req, res, next) => {
  const {client_id, user_tools} = req.body
  const query = `
    DELETE FROM clients
    WHERE client_id = ${client_id}
    AND   user_id = ${user_tools}`
  const msg = 'DELETE_CLIENT'

  reply(res, query, msg)
})

router.post('/createsession', bodyParser.json(), (req, res, next) => {
  const {client_id, user_tools} = req.body
  const query_checkDouble = `
    SELECT session_id
    FROM   sessions
    WHERE  session_client = ${client_id}
    AND    session_closed = 0`
  const connection = mysql.createConnection(dbConfig)
    let promise = new Promise((resolve, reject) => {
      connection.query(
        query_checkDouble,
        (err, results) => {
          if (!err) {
            if (results.length > 0) {
              reject('bad - double session')
            } else {
              resolve('good - insert session')
            }
          }
        }
      )
    })
    promise.then(
      () => {
        const now   = new Date()
        const date  = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`
        const query = `
          INSERT INTO sessions
          VALUES(null, '${user_tools}', '${date}', '${client_id}', ' --- ', 0, 1, 'master', 0)`
        connection.query(
          query,
          (err, results) => {
            if (!err) {
              res.status(200).send('INSERT_SESSION')
            } else {
              res.status(200).send('ERROR_INSERT_SESSION')
            }
          }
        )
        connection.end()
      },
      () => {
        res.status(200).send('DOUBLE_SESSION')
        connection.end()
      }
    )
})

router.get('/paycards', (req, res, next) => {
  const user_tools = req.query.user_tools
  const query = `
    SELECT *
    FROM   allcards AS ac
    WHERE  ac.cards_id 
    NOT IN (SELECT cards_id FROM userscards WHERE cards_id = ac.cards_id AND user_id = '${user_tools}') 
    AND    ac.cards_type != 0`
  reply(res, query)
})

router.delete('/deletesession', bodyParser.json(), (req, res, next) => {
  const {user_tools, session_id} = req.body
  const query = `
    DELETE FROM sessions
    WHERE session_id   = ${session_id}
    AND   session_user = ${user_tools}`
  const msg = 'DELETE_SESSION'
  reply(res, query, msg)
})

router.post('/closesession', bodyParser.json(), (req, res, next) => {
  const {user_tools, session_id} = req.body
  const query = `
    UPDATE sessions 
    SET    session_closed = 1
    WHERE  session_id   = ${session_id}
    AND    session_user = ${user_tools}`
  const msg = 'CLOSE_SESSION'
  reply(res, query, msg)
})

router.get('/allselectedcardsitemsbase', (req, res, next) => {
  const session_id = req.query.session_id
  const query = `
    SELECT   sc.card_box_id, s.active_card_box  
    FROM     sessions AS s, sessions_cards AS sc
    WHERE    sc.session_id = s.session_id 
    AND      sc.session_id = ${session_id}
    GROUP BY sc.card_box_id`
  reply(res, query)
})
router.get('/allselectedcardsitemscards', (req, res, next) => {
  const carbox_id = req.query.carbox_id
  const table = `allcards__items_${carbox_id}`
  const query = `
    SELECT   *  
    FROM     ${table}`
  reply(res, query)
})
router.get('/allselectedcardsitemsacb', (req, res, next) => {
  const carbox_id = req.query.carbox_id
  const table = `allcards__items_${carbox_id}`
  const query = `
    SELECT   *  
    FROM     ${table}`
  reply(res, query)
})

router.get('/selectedcardsitems', (req, res, next) => {
  const cards_id = req.query.cards_id
  const table = `allcards__items_${cards_id}`
  const query = `
    SELECT *
    FROM   ${table}`
  reply(res, query)
})

router.get('/cardsthissession', (req, res, next) => {
  const {session_id} = req.query
  const query = `
    SELECT cards_id, cards_name, cards_img, position_left, position_top, scale
    FROM   sessions_cards
    WHERE  session_id = '${session_id}'`
  reply(res, query)
})

module.exports = router

// Если запрос строка, то просто выполняем его, если не строка(массив) - то проходим по всем элементам этого массива, выполняем все его запросы и отдаем один общий результат.
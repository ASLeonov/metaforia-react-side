import React from 'react'
import {useState, useEffect} from 'react'
// import './current-sessions.css'

function LastSessions() {

  const [fetched, setFetched] = useState([])

  const userHardCode = "tanyaleo81@yandex.ru"
  const sessions_list = []

  useEffect( () => {
    fetch(`http://localhost/ll/sessions.php?name=${userHardCode}&type=lastSessions`)
      .then(res => res.json())
      .then(res => {
        if (fetched.length === 0) {
          res.forEach(element => {
            console.log(typeof element.session_date)
            sessions_list.push(
              <div className="sessions-item" key={element.session_id}>
                <div className="sessions-item-caption">
                  <span className="sessions-item-caption__1stelement">
                    {element.session_date}
                  </span>
                  <span className="sessions-item-caption__2ndelement">
                    {`${element.client_name} ${element.client_surname}`} 
                  </span>
                </div>
                <div className="sessions-item-body">
                  {element.session_descr}
                  {/* {element.session_closed} */}
                </div>
              </div>
            )         
          })
          console.log('sessions list ->', sessions_list)
          setFetched(sessions_list)
        }
      })
      .catch(err => console.log('error', err))
  })

  return (
      <div>
        {fetched}
      </div>
  )
}

export default LastSessions
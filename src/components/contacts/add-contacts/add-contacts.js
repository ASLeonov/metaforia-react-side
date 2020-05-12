import React, {useState} from 'react'
import {connect} from 'react-redux'
import {selectUser} from '../../../store/selectors'
import {getContacts} from '../../../store/action-creators'
import {api_path} from '../../../store/common'
import './add-contacts.css'

function AddContacts(props) {
  const empty_data = {client_id:'', name:'', surname:'', gender:'', email:'', descr:''}
  const [clientData, setClientData] = useState(empty_data)

  const handleChange = event => {
    // if (isEdit) {
      setClientData({...clientData, [event.target.name]: event.target.value})
    // }
  }

  const onCancelClick = (props) => {
    setClientData(empty_data)
  }

  const handleSubmit = event => {
    // if  (clientData.name === client_name && clientData.surname === client_surname && clientData.gender === client_gender && // Нажали сохранить ничего не изменив
    //     clientData.email === client_email && clientData.descr === client_descr) {
    //       event.preventDefault()
    //       setIsEdit(false)
    //       return
    //     }
    event.preventDefault()
    // setIsUpdating(true)
    
    fetch(`${api_path}clients.php`, {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},
      body: `insert=ok&user_name=${props.user.login}&client_id=${clientData.client_id}&client_name=${clientData.name}&client_surname=${clientData.surname}&client_gender=${clientData.gender}&client_email=${clientData.email}&client_descr=${clientData.descr}`
    })
      .then(response => response.text())
      .then(data => {
        if (data === 'INSERT_CLIENT') {
          props.getContacts()
          console.log('INSERT_CLIENT')
        }
      })
      .catch(e => console.log('catch error =>', e))
  }

  const client_data = (
    <div className="content-item-form">
      <form onSubmit={handleSubmit}>
        <label>
          <span>Имя:</span>
          <input type="text" name="name" value={clientData.name} onChange={handleChange} />
        </label>
        <label>
          <span>Фамилия:</span>
          <input type="text" name="surname" value={clientData.surname} onChange={handleChange} />
        </label>
        <label>
          <span>Пол:</span>
          <input type="text" name="gender" value={clientData.gender} onChange={handleChange} />
        </label>
        <label>
          <span>E-mail:</span>
          <input type="text" name="email" value={clientData.email} onChange={handleChange} />
        </label>
        <label className="content-contacts-list__item___description">
          <span>Примечание:</span>
          <textarea name="descr" value={clientData.descr} onChange={handleChange} />
        </label>
        <div className="content-item-form___buttons">
          <input type="submit" className={"content-item-form___button"} value="Сохранить" />
          <input type="button" className={"content-item-form___button"} value="Отменить" onClick={onCancelClick} />
        </div>
      </form>
    </div>
  )

  return (
    <div className="content-contacts-body-addContacts">
      {client_data}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: selectUser(state)
  }
}

export default connect(
  mapStateToProps,
  {
    getContacts: getContacts
  }
)(AddContacts)
import React, {useState} from 'react'
import {connect} from 'react-redux'
import {selectUser} from '../../../store/selectors'
import {getContacts} from '../../../store/action-creators'
import {validateField} from '../../../functions/form-validate'
import {api_path} from '../../../store/common'
import './add-contacts.css'

function AddContacts(props) {
  const empty_data = {client_id:'', name:'', surname:'', gend:'', email:'', descr:''}
  const [clientData, setClientData] = useState(empty_data)
  const [badValues, setBadValues] = useState({})

  const handleChange = event => {
    // if (isEdit) {
    const isRequired = (event.target.name === 'name' || event.target.name === 'email') ? true : false
      if (validateField([event.target.name, event.target.value, isRequired])) {
        const new_bad_values = {...badValues}
        delete new_bad_values[event.target.name]
        setBadValues({...new_bad_values})
      } else {
        setBadValues({...badValues, [event.target.name]: `-${event.target.value}-`})
      }
  
  setClientData({...clientData, [event.target.name]: event.target.value})



      setClientData({...clientData, [event.target.name]: event.target.value})
    // }
  }

  const onCancelClick = (props) => {
    setClientData(empty_data)
    setBadValues({})
  }

  const handleSubmit = event => {
    // if  (clientData.name === client_name && clientData.surname === client_surname && clientData.gend === client_gender && // Нажали сохранить ничего не изменив
    //     clientData.email === client_email && clientData.descr === client_descr) {
    //       event.preventDefault()
    //       setIsEdit(false)
    //       return
    //     }
    event.preventDefault()

    if (Object.keys(badValues).length > 0) return
    // setIsUpdating(true)
    
    fetch(`${api_path}clients.php`, {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},
      body: `insert=ok&user_name=${props.user.login}&client_id=${clientData.client_id}&client_name=${clientData.name}&client_surname=${clientData.surname}&client_gender=${clientData.gend}&client_email=${clientData.email}&client_descr=${clientData.descr}`
    })
      .then(response => response.text())
      .then(data => {
        if (data === 'INSERT_CLIENT') {
          props.getContacts()
        }
      })
      .catch(e => console.log('catch error =>', e))
  }

  const client_data = (
    <div className="content-item-form">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <label>
          <span>Имя<sup>*</sup>:</span>
          <input type="text" name="name" value={clientData.name} onChange={handleChange} />
          <span className="item-form-verification" style={badValues["name"] ? {color:'red'} : {color:'green'}}>{badValues["name"] ? '❗' : '✔'}</span>
        </label>
        <label>
          <span>Фамилия:</span>
          <input type="text" name="surname" value={clientData.surname} onChange={handleChange} />
          <span className="item-form-verification" style={badValues["surname"] ? {color:'red'} : {color:'green'}}>{badValues["surname"] ? '❗' : '✔'}</span>
        </label>
        <label>
          <span>Пол:</span>
          <input type="text" name="gend" value={clientData.gend} onChange={handleChange} />
          <span className="item-form-verification" style={badValues["gend"] ? {color:'red'} : {color:'green'}}>{badValues["gend"] ? '❗' : '✔'}</span>
        </label>
        <label>
          <span>E-mail<sup>*</sup>:</span>
          <input type="text" name="email" value={clientData.email} onChange={handleChange} />
          <span className="item-form-verification" style={badValues["email"] ? {color:'red'} : {color:'green'}}>{badValues["email"] ? '❗' : '✔'}</span>
        </label>
        <label className="content-contacts-list__item___description">
          <span>Примечание:</span>
          <textarea name="descr" value={clientData.descr} onChange={handleChange} />
          <span className="item-form-verification-top" style={badValues["descr"] ? {color:'red'} : {color:'green'}}>{badValues["descr"] ? '❗' : '✔'}</span>
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
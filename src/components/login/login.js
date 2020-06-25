import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {login} from '../../store/action-creators/user'
import {selectUser} from '../../store/selectors/user'
import Alerts from '../alerts'
import {validateField} from '../../functions/form-validate'
import './login.css'

function Login({user, login}) {
  const [loginType, setLoginType]           = useState('enter')
  const [formData, setFormData]             = useState({name: '', login: '', password: ''})
  const [badValuesEnter, setBadValuesEnter] = useState({login: '1', password: '2'})
  const [badValuesReg, setBadValuesReg]     = useState({login: '1', name: '2'})
  const [showAlert, setShowAlert]           = useState([])

  const requiredFields = {login: '1', name: '2', password: '3'}

  const formItem = (label, data) => (
    <>
      <label>{label}</label>
        <input
          name={data}
          value={formData[data]}
          onChange={onFormDataChange}
          type={data === 'password' ? 'password' : ''}
        />
        {loginType === 'enter' ? 
          <span className="login-form-verification" style={badValuesEnter[data] ? {color:'red'} : {color:'green'}}>{badValuesEnter[data] ? '❗' : '✔'}</span> :
          <span className="login-form-verification" style={badValuesReg[data]   ? {color:'red'} : {color:'green'}}>{badValuesReg[data]   ? '❗' : '✔'}</span>
        }
    </>
  )

  const onFormDataChange = e => {
    const isRequired = (requiredFields[e.target.name]) ? true : false
      if (validateField([e.target.name, e.target.value, isRequired])) {
        if (loginType === 'enter') {
          const new_bad_values = {...badValuesEnter}
          delete new_bad_values[e.target.name]
          setBadValuesEnter({...new_bad_values})
        } else {
          const new_bad_values = {...badValuesReg}
          delete new_bad_values[e.target.name]
          setBadValuesReg({...new_bad_values})
        }
      } else {
        if (loginType === 'enter') {
          setBadValuesEnter({...badValuesEnter, [e.target.name]: '-'})
        } else {
          setBadValuesReg({...badValuesReg, [e.target.name]: '-'})
        }
      }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const onChangeType = type => {
    type === 'enter' && loginType !== 'enter' && setLoginType('enter')
    type !== 'enter' && loginType === 'enter' && setLoginType('reg')
    setFormData({name: '', login: '', password: ''})   
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (loginType === 'enter') {
      if (Object.keys(badValuesEnter).length === 0) {
        login(formData.login, formData.password)
      } else {
        setShowAlert([
          'notification',
          'column',
          'alert_loginBadValueEnter',
          () => setShowAlert([]),
        ])
      }
    } else {
      if (Object.keys(badValuesReg).length === 0) {
        // регистрационные действия
      } else {
        setShowAlert([
          'notification',
          'column',
          'alert_loginBadValueReg',
          () => setShowAlert([]),
        ])
      }
    }
    
  }

  useEffect( () => {
    if (user.login === 'BAD_LOGIN') {
      setShowAlert([
        'notification',
        'column',
        'alert_loginError',
        () => setShowAlert([]),
      ])
    }
  }, [user])

  console.log('render Login', badValuesReg)

  return(
    <div className="login">
      <div className="login-content">
        <div className="login-tabs">
          <p className={loginType === 'enter' ? 'login-tabs-item__active' : 'login-tabs-item'} onClick={() => onChangeType('enter')}>Вход</p>
          <p className={loginType !== 'enter' ? 'login-tabs-item__active' : 'login-tabs-item'} onClick={() => onChangeType('reg')}>Регистрация</p>
        </div>
        <form
          onSubmit={handleSubmit}
          method="post"
          style={loginType === 'enter' ? {borderTopRightRadius:'8px'} : {borderTopLeftRadius:'8px'}}
        >
          {loginType === 'enter' ? 
            <>
              {formItem('E-mail (логин)', 'login')}
              {formItem('Пароль', 'password')}
            </> : 
            <>
              {formItem('E-mail (логин)', 'login')}
              {formItem('Ваше имя', 'name')}
              <p>Инфа будет выслана на почту</p>
            </>
          }
            <input type='submit' value={loginType === 'enter' ? 'Войти' : 'Зарегистрироваться'} />
              <span className="login-form-support">
                Служба поддержки
              </span>
        </form>
        {showAlert.length > 0 ? 
          <Alerts
            data = {{messageType: showAlert[0], direction: showAlert[1], text: showAlert[2]}}
            applyChanges = {showAlert[3]}
            discardChanges = {showAlert[4]}
          /> : ''
        }
      </div>
    </div>
  )
}

export default connect(
  state => ({
    user: selectUser(state)
  }),
  {
    login
  }
)(Login)
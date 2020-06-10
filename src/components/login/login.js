import React, {useState} from 'react'
import './login.css'

function Login() {
  const [loginType, setLoginType] = useState('enter')
  const [formData, setFormData] = useState({name: '', login: '', password: ''})

  const formItem = (label, data) => (
    <>
      <label>{label}</label>
        <input
          name={data}
          value={formData.data}
          onChange={onFormDataChange}
          type={data === 'password' ? 'password' : ''}
        />
    </>
  )

  const onFormDataChange = e => setFormData({
    ...formData,
    [e.target.name]: e.target.value
  })

  const onChangeType = type => {
    type === 'enter' && loginType !== 'enter' && setLoginType('enter')
    type !== 'enter' && loginType === 'enter' && setLoginType('reg')
  }

  const handleSubmit = e => {
    e.preventDefault()
  }

  console.log(formData)

  return(
    <div className="login">
      <div className="login-content">
        {/* <h2>{loginType === 'enter' ? 'Вход' : 'Регистрация'}</h2> */}
        <div className="login-tabs">
          <p className={loginType === 'enter' ? 'login-tabs-item__active' : 'login-tabs-item'} onClick={() => onChangeType('enter')}>Вход</p>
          <p className={loginType !== 'enter' ? 'login-tabs-item__active' : 'login-tabs-item'} onClick={() => onChangeType('reg')}>Регистрация</p>
        </div>
        <form
          onSubmit={handleSubmit}
          method="post"
          style={loginType === 'enter' ? {borderTopRightRadius:'8px'} : {borderTopLeftRadius:'8px'}}
        >
          {loginType !== 'enter' ? formItem('Ваше имя', 'name') : ''}
          {formItem('E-mail (логин)', 'login')}
          {loginType === 'enter' ? formItem('Пароль', 'password') : <p>Инфа будет выслана на почту</p>}

          <input type='submit' value={loginType === 'enter' ? 'Войти' : 'Зарегистрироваться'} />

        </form>
      </div>
    </div>
  )
}

export default Login
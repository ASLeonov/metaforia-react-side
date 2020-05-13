import React from 'react'
import './header.css'
import User from './user'
import Exit from './exit'

function Header() {

  // console.log('render Header')

  return (
    <header className="header">
      <User />
      <Exit />
    </header>
  )
}

export default Header
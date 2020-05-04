import React from 'react'
import {useState} from 'react'
import Sidebar from '../sidebar'
import Content from '../content'
import './middle.css'

function Middle() {

  const [activePage, setActivePage] = useState('sessions')

  const onChangeActivePage = currentPage => {
    setActivePage(currentPage)
  }

  return (
    <div className="middle">
      <Sidebar changePage={onChangeActivePage} activePage={activePage} />
      <Content changePage={onChangeActivePage} activePage={activePage} />
    </div>
  )

}

export default Middle
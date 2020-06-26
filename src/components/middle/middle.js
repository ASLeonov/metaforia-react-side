import React from 'react'
import Sidebar from '../sidebar'
import Content from '../content'
import './middle.css'

function Middle(props) {

  return (
    <div className="middle">
      <Sidebar activePage={props.activePage} />
      <Content activePage={props.activePage} activeTab={props.activeTab}/>
    </div>
  )

}

export default Middle
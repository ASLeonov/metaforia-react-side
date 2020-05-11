import React from 'react'
import CurrentContacts from '../current-contacts'
import AddContacts from './add-contacts'
import './contacts-body.css'

function ContactsBody(props) {
  let currentData = ''

  switch (props.activeContactsTab) {
    case 'currentContacts':
      currentData = <CurrentContacts />
      break;
    case 'addContacts':
      currentData = <AddContacts />
      break;
    default:
      currentData = <CurrentContacts />
      break;
  }

  return (
    <div className="content-contacts-body">
      {currentData}
    </div>
  )
}

export default ContactsBody
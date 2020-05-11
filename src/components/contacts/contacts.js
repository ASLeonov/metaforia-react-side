import React from 'react'
import ContactsCaption from './contacts-caption'
import ContactsBody from './contacts-body'
import './contacts.css'

function Contacts(props) {

  return (
    <div className="content-contacts">
      <ContactsCaption />
      <ContactsBody activeContactsTab={props.activeContactsTab} />
    </div>
  )
}

export default Contacts
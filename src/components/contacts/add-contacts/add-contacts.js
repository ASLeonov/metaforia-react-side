import React from 'react'
import {connect} from 'react-redux'
import {selectUser} from '../../../store/selectors'
import {getContacts} from '../../../store/action-creators'
import ContactItem from '../contact-item'
import './add-contacts.css'

function AddContacts({user, getContacts}) {
  const empty_data = {client_id:'', client_name:'', client_surname:'', client_gender:'', client_email:'', client_descr:''}

  const client_data = (
    <ContactItem activeContact={[empty_data]} type="add_contact" user={user} getContacts={getContacts} />
  )

  return (
    <div className="content-contacts-body-addContacts">
      {client_data}
    </div>
  )
}

export default connect(
  state => ({
    user: selectUser(state)
  }),
  {
    getContacts
  }
)(AddContacts)
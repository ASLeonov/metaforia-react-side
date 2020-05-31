import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {getContacts} from '../../../store/action-creators'
import {getCurrentSessions} from '../../../store/action-creators/sessions-actions'
import {selectContacts} from '../../../store/selectors/contacts'
import {selectUser} from '../../../store/selectors'
import ContactsList from '../contacts-list'
import ContactItem from '../contact-item'
import Messages from '../../messages'
import Loader from '../../loader'
import './current-contacts.css'

function CurrentContacts(props) {
  const [activeContact, setActiveContact] = useState('')
  const {contacts_data, getContacts, getCurrentSessions, user} = props
  let contacts_list, contact_item

  const changeActiveContact = contactId => {
    setActiveContact(contactId)
  }

  console.log('activeContact', activeContact)

  if (contacts_data.isLoading) {
    contacts_list = <Loader />
    contact_item  = <Loader />
  }

  if (contacts_data.isLoaded) {
    if (contacts_data.data[0] !== "ERROR") {
      if (contacts_data.data.length > 0) {
        (activeContact === '' || !contacts_data.data.find(element => element.client_id === activeContact)) && setActiveContact(contacts_data.data[0].client_id)
        if (activeContact !== '') {
          contacts_list = 
            <ContactsList
              changeActiveContact={changeActiveContact}
              data={contacts_data.data}
              activeContact={activeContact}
            />
          contact_item = 
            <ContactItem 
              key={`contact-item-key__${activeContact}`} 
              activeContact={contacts_data.data.filter(element => element.client_id === activeContact)} 
              user={user} 
              getContacts={getContacts}
              getCurrentSessions={getCurrentSessions}
            />
        }
      } else {
        (activeContact !== '') && setActiveContact('')
        contact_item = <Messages caption="message_contactsNone" />
      }
    } else {
      contacts_list = <Messages caption="message_contactsError" />
    }
  }

  useEffect( () => {
    if (!contacts_data.isLoaded && !contacts_data.isLoading) {
      getContacts()
    }
  }, [])

  return (
    <div className="content-contacts-body-currentContacts">
      <div className="contacts-list" style={activeContact ? {} : {display:'none'}}>
        {contacts_list}
      </div>
      <div className="contact-item" style={activeContact ? {} : {width:'100%'}}>
        {contact_item}
      </div>
    </div>
  )
}

export default connect(
  state => ({
    contacts_data: selectContacts(state),
    user: selectUser(state)
  }),
  {
    getContacts,
    getCurrentSessions
  }
)(CurrentContacts)

// 
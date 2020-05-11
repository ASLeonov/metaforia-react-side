import React, {useState} from 'react'
import {connect} from 'react-redux'
import {getContacts} from '../../../store/action-creators'
import {selectContacts} from '../../../store/selectors/contacts'   //selectContactsJSX
import {selectUser} from '../../../store/selectors'
import ContactsList from '../contacts-list'
import ContactItem from '../contact-item'
import Messages from '../../messages'
import Loader from '../../loader'
import './current-contacts.css'

function CurrentContacts(props) {
  const [activeContact, setActiveContact] = useState('')
  const {contacts_data, getContacts, user} = props
  let contacts_list, contact_item

  const changeActiveContact = contactId => {
    setActiveContact(contactId)
  }

  if (!contacts_data.isLoaded) {
    contacts_list = <Loader />
    contact_item = <Loader />
    getContacts()
  } else if (contacts_data.data[0] !== "ERROR") {
    contacts_list = <ContactsList changeActiveContact={changeActiveContact} data={contacts_data.data} />
      const tmp = contacts_data.data.find(element => element.client_id === activeContact)
      // console.log(tmp)
        if (tmp) {
          contact_item = <ContactItem activeContact={contacts_data.data.filter(element => element.client_id === activeContact)} user={user} getContacts={getContacts}/>
        }
  } else {
    contacts_list = <Messages caption="message_contactsError" />
  }

  return (
  <div className="content-contacts-body-currentContacts">
    <div className="contacts-list">
      {contacts_list}
    </div>
    <div className="contact-item">
      {contact_item}
    </div>
  </div>

  )
}

const mapStateToProps = (state) => {
  return {
    contacts_data: selectContacts(state),
    user: selectUser(state)
    // contactsListJSX: selectContactsListJSX(state)
  }
}

const mapDispatchToProps = {
  getContacts: getContacts
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentContacts)
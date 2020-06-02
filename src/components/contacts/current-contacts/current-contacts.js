import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {getContacts} from '../../../store/action-creators'
import {getCurrentSessions} from '../../../store/action-creators/sessions-actions'
import {selectCurrentSessions} from '../../../store/selectors/sessions'
import {selectContacts} from '../../../store/selectors/contacts'
import {selectUser} from '../../../store/selectors'
import ContactsList from '../contacts-list'
import ContactItem from '../contact-item'
import Messages from '../../messages'
import Loader from '../../loader'
import './current-contacts.css'

function CurrentContacts(props) {
  const [activeContact, setActiveContact] = useState('')
  const {contacts_data, getContacts, getCurrentSessions, currentSessions, user} = props
  let contacts_list, contact_item

  const changeActiveContact = contactId => {
    setActiveContact(contactId)
  }

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
              currentSessions={currentSessions}
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

  console.log('render current contacts', '    activeContact ->', activeContact)

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
    user: selectUser(state),
    contacts_data: selectContacts(state),
    currentSessions: selectCurrentSessions(state)
  }),
  {
    getContacts,
    getCurrentSessions
  }
)(CurrentContacts)

// 

// Корректная работа:
// После первого рендера срабатывает useEffect и при необходимости фетчим данные с сервера.
// Фетч один, все нормально.
// Если данные уже загружены ранее, то проверяем установлен ли ранее активный клиент (к-й выделен в <ContactsList /> и отображается в <ContactItem />) - если он выбран ранее, от это значение из state этого компонента, в противном случае берем первую запись по клиентам из store (редюсер contacts).
// Количество рендеров соответствует количеству обновлений store и state (4 при монтировании с фетчем данных).
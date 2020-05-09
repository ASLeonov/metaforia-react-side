import React from 'react'
import {connect} from 'react-redux'
import {getContacts} from '../../store/action-creators'
import {selectContacts, selectContactsJSX} from '../../store/selectors/contacts'
import Messages from '../messages'
import Loader from '../loader'
import './contacts.css'

function Contacts(props) {
  const {contacts_data, contactsJSX, getContacts} = props
  let fetched

  if (!contacts_data.isLoaded) {
    fetched = <Loader />
    getContacts()
  } else if (contacts_data.data[0] !== "ERROR") {
    fetched = contactsJSX
  } else {
    fetched = <Messages caption="message_contactsError" />
  }

  return (
      <div className="content-contacts">
        <div className="content-contacts-list">
          <p className="content-contacts-list__title">
            Список Ваших клиентов / Создание сессии
          </p>
          <div className="content-contacts-list__body">
            {fetched}
          </div>
        </div>
        <div className="content-contacts-other">
          <button className="content-contacts-list__item___button buttonAddClient">
            Добавить нового клиента
          </button>
        </div>
      </div>
  )
}

const mapStateToProps = (state) => {
  return {
    contacts_data: selectContacts(state),
    contactsJSX: selectContactsJSX(state)
  }
}

const mapDispatchToProps = {
  getContacts: getContacts
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Contacts)
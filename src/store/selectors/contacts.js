// import React from 'react'
// import {createSelector} from 'reselect'
// import Messages from '../../components/messages'
// import ContactListItem from '../../components/contacts/contact-item'
// import Contact from '../../components/contacts/contact'

export const selectContacts = state => state.contacts

// мемоизация кода разметки для контактов. При любом изменении стора будет пересчитываться. При неизменном сторе - нет. Где-то тут косяк.
// export const selectContactsJSX = createSelector(
//   selectContacts,     // state => state.contacts
//   (contacts, result) => {
//     if (contacts.data.length > 0) {
//       result = contacts.data.map(
//         element => (
//           <Contact key={element.client_id} clientData={element} />
//         )
//       )
//     } else {
//       result = <Messages caption="message_contactsNone" />
//     }
//     return result
//   }
// )
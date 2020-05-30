// import React from 'react'
// import {createSelector} from 'reselect'
// import Messages from '../../components/messages'

export const selectCurrentSessions = state => state.currentSessions
export const selectLastSessions = state => state.lastSessions

export const selectThisSession = state => state.thisSession

// export const selectLastSessionsJSX = createSelector(
//   selectLastSessions,
//   (lastSessions, result) => {
//       if (lastSessions.data.length > 0) {
//         result = lastSessions.data.map(element => (
//           <div className="sessions-item" key={element.session_id}>
//             <div className="sessions-item-caption">
//               <span className="sessions-item-caption__1stelement">
//                 {element.session_date}
//               </span>
//               <span className="sessions-item-caption__2ndelement">
//                 {`${element.client_name} ${element.client_surname}`} 
//               </span>
//             </div>
//             <div className="sessions-item-body">
//               {element.session_descr}
//             </div>
//           </div>
//           )
//         )
//       } else {
//         result = <Messages caption="message_lastSessionsNone" />
//       }
//     return result
//   }
// )
import {React} from 'react'
import {createSelector} from 'reselect'

export const selectUser = state => state.user

export const selectCurrentSessions = state => state.currentSessions
export const selectLastSessions = state => state.lastSessions

export const selectCurrentSessionsData = createSelector(
  selectCurrentSessions,
  (currentSessions) => {
    const result = []
    console.log('input ->',currentSessions.data, currentSessions.data.length)
      if (currentSessions.data.length > 0) {
        console.log('123')
        result.push(`<div className="sessions-item">123123123</div>`)
      }
        // result = currentSessions.data.map(element => (
          // <div className="sessions-item" key={element.session_id}>
          //   <div className="sessions-item-caption">
          //     <span className="sessions-item-caption__1stelement">
          //       {element.session_date}
          //     </span>
          //     <span className="sessions-item-caption__2ndelement">
          //       {`${element.client_name} ${element.client_surname}`} 
          //     </span>
          //   </div>
          //   <div className="sessions-item-body">
          //     {element.session_descr}
          //   </div>
          // </div>
          // )
        // )
      // }
    console.log('result ->',result)
    return result
  }
)
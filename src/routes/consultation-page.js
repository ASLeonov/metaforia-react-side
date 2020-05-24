import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Consultation from '../components/consultation'

function ConsultationPage() {

  return (
    <Switch>
      <Route
        path="/consultation/:id"
        render={ ({match}) => <Consultation consultation_id={match.params.id} /> }
      />
      <Redirect from={'/restaurant'} to={`/restaurant/${`123`}`} />   
    </Switch>
  )
}

export default ConsultationPage

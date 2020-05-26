import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default function PrivateRoute ({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route exact {...rest} onEnter={() => console.log('Entered /')} render={props => (
      isAuthenticated
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { referer: props.location } }} />
    )} />
  )
}

import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext from "./UserContext"

const ProtectedRoute = ({ component: Component, storedUser, ...rest }) => {
  
    return (
      <Route {...rest} render={ props => {
          if (storedUser) {
            return <Component {...rest} {...props} />
          } else {
            return <Redirect to={
              {
                pathname: '/',
                state: {
                  from: props.location
                }
              }
            } />
          }
        }
      } />
    )
  }
  
  export default ProtectedRoute;
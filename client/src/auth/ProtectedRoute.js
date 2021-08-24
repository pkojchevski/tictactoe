import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {isLoggedIn} from './index'

 const ProtectedRoute = ({component:Component, ...rest}) => {
    return (
        <div>
            <Route {...rest} 
                 render={props => isLoggedIn() ? 
            (<Component {...props} />) 
            : 
            (<Redirect 
                 to = {{
                     pathname:"/login",
                     state:{from:props.location}
                 }}
            />)
                }
            
            />
        </div>
    )
}

export default ProtectedRoute;
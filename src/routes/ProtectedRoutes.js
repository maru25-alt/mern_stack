import React from 'react';
import {Route , Redirect} from 'react-router-dom'

export const SignedInRoutes = ({component, path,  isAuth, exact}) => {
    if(!isAuth) {
        return <Redirect to="/signin"/>
    }
    return <Route path={path} component={component}/> 
}

export const SignedOutRoutes = ({component, path,  isAuth, exact}) => {
    if(isAuth) {
        return <Redirect to="/"/>
    }
    return <Route path={path} component={component} exact={exact}/>
}
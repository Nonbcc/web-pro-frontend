import React from 'react'
import { useSelector } from 'react-redux'
import { Route } from 'react-router-dom';
import { Redirect } from '../../node_modules/react-router-dom/index';

export default function AdminRoute({component: Component, ...rest}) {
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  return (
      <Route {...rest} render = {(props) => userInfo && userInfo.isAdmin ? ( <Component {...props}></Component>):
    (
        <Redirect to="/signin"/>
    )}></Route>
  )
}

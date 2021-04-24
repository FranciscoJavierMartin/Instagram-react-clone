import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import firebase from 'firebase';
import { LOGIN_PAGE_ROUTE } from '../constants/routes';

interface ProtectedRouteProps extends RouteProps {
  user: firebase.User | null;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  user,
  children,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return user ? (
          children
        ) : (
          <Redirect
            to={{ pathname: LOGIN_PAGE_ROUTE, state: { from: location } }}
          />
        );
      }}
    />
  );
};

export default ProtectedRoute;

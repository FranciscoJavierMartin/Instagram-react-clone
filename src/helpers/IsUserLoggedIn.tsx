import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import firebase from 'firebase';

interface IsUserLoggedInProps extends RouteProps {
  user: firebase.User | null;
  loggedInPath: string;
}

const IsUserLoggedIn: React.FC<IsUserLoggedInProps> = ({
  user,
  children,
  loggedInPath,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return !user ? (
          children
        ) : (
          <Redirect
            to={{ pathname: loggedInPath, state: { from: location } }}
          />
        );
      }}
    />
  );
};

export default IsUserLoggedIn;

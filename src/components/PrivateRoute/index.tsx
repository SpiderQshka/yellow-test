import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "context/auth";

export const PrivateRoute: React.FunctionComponent<any> = ({
  children,
  ...rest
}) => {
  const { token } = useAuth();
  return (
    <Route {...rest} render={() => (token ? children : <Redirect to="/" />)} />
  );
};

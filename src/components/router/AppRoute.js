import React from "react";
import { Route, Redirect } from "react-router-dom";
import {isAuthenticated} from "../../services/auth"

export default function AppRoute({
  component: Component,
  path,
  isPrivate,
  ...props
}) {
  return (
    <Route
      exact path={path}
      render={props =>
        isPrivate && !isAuthenticated() ? (
          <Redirect 
            to={ path="/login" }
          />
        ) : (
          <Component {...props} />
        )
      }
      {...props}
    />
  );
}

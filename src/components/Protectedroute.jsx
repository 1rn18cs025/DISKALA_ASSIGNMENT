import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const hasToken = sessionStorage.getItem("token");

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        hasToken ? <Component {...props} /> : <Redirect to="/signup" />
      }
    />
  );
}

export default ProtectedRoute;
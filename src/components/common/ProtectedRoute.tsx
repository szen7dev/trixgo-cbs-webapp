import { FC } from "react";
import { RouteProps, Redirect, Route } from "react-router-dom";

import { useAuth } from "services/hooks/useAuth";

const ProtectedRoute: FC<RouteProps> = ({ ...routeProps }) => {
  const { hasAuthenticated } = useAuth();

  if (hasAuthenticated) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to="/authentication/sign-in" />;
  }
};

export default ProtectedRoute;

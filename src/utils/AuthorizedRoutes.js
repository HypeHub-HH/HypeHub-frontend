import { Navigate } from 'react-router-dom';
import * as React from 'react';

const AuthorizedRoutes = ({ children }) => {
  const accessToken = localStorage.getItem('ACCESS_TOKEN');

  return accessToken ? <>{children}</> : <Navigate to="/" />;
};

export default AuthorizedRoutes;

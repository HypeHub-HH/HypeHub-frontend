import * as React from 'react';
import { Navigate } from 'react-router-dom';

const AuthorizedRoutes = ({ children }) => {
  const accessToken = localStorage.getItem('ACCESS_TOKEN');

  return accessToken ? <>{children}</> : <Navigate to="/" />;
};

export default AuthorizedRoutes;

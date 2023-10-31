import { Navigate } from 'react-router-dom';
import * as React from 'react';

const UnAuthorizedRoutes = ({ children }) => {
  const accessToken = localStorage.getItem('ACCESS_TOKEN');

  return !accessToken ? <>{children}</> : <Navigate to="/explore" />;
};

export default UnAuthorizedRoutes;

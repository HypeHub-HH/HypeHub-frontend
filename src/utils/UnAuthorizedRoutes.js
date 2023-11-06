import * as React from 'react';
import { Navigate } from 'react-router-dom';

const UnAuthorizedRoutes = ({ children }) => {
  const accessToken = localStorage.getItem('ACCESS_TOKEN');

  return !accessToken ? <>{children}</> : <Navigate to="/explore" />;
};

export default UnAuthorizedRoutes;

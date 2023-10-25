import { Navigate, Outlet } from 'react-router-dom';
import * as React from 'react';

const UnAuthorizedRoutes = ({ children }) => {
  const accessToken = localStorage.getItem('ACCESS_TOKEN');

  return !accessToken ? <>{children}</> : <Navigate to="/home" />;
};

export default UnAuthorizedRoutes;

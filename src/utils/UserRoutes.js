import * as React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';

const UserRoutes = () => {
  const { currentUser } = useAuth();

  return currentUser?.roles?.find((role) => role === 'User') ? <Outlet /> : <Navigate to="/" />;
};

export default UserRoutes;

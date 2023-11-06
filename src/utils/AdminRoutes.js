import * as React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';

const AdminRoutes = () => {
  const { currentUser } = useAuth();

  return currentUser?.roles?.find((role) => role === 'Admin') ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoutes;

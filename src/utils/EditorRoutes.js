import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import * as React from 'react';

const EditorRoutes = () => {
  const { currentUser } = useAuth();

  return currentUser?.roles?.find((role) => role === 'Editor') ? <Outlet /> : <Navigate to="/" />;
};

export default EditorRoutes;

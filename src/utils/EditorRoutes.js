import * as React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';

const EditorRoutes = () => {
  const { currentUser } = useAuth();

  return currentUser?.roles?.find((role) => role === 'Editor') ? <Outlet /> : <Navigate to="/" />;
};

export default EditorRoutes;

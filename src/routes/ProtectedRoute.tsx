import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { login } = useContext(UserContext);
  if (login) return children;
  else return <Navigate to="/login" />;
};

export default ProtectedRoute;

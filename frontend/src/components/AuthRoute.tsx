import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token'); // You can also validate the token if needed

  if (!isAuthenticated) {
    return <Navigate to="/signin" />; // Redirect to login page if not authenticated
  }

  return children; // Render the protected component if authenticated
};

export default AuthRoute;

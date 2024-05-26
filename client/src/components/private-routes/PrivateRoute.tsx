import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
  roles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ roles }) => {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user) {
    return <Navigate to="/login" />;
  }

//   if (roles && roles.includes('seller')) {
//     return <Navigate to="/seller-dashboard" />;
//   }
// if (roles && roles.includes(user.role)) {
//     return <Navigate to="/" />;
//   }
  if (roles && roles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PrivateRoute;

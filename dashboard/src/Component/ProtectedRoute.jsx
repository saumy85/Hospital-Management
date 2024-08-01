import React from "react";
import { Route, Navigate, useNavigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../main";
import Login from "../pages/Login";

export function ProtectedRoute() {
  const { user, isAuthenticated } = useContext(Context);

  return user._id && isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

// const ProtectedRoute = ({ element: Component, ...rest }) => {
//   const { isAuthenticated, user } = useContext(Context);
//   c;
//   return (
//     <Route
//       {...rest}
//       element={isAuthenticated && user ? <Component /> : <Login />}
//     />
//   );
// };

export default ProtectedRoute;

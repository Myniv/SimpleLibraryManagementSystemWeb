/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { HeaderFunction } from "../Component/Modules/Head";
import { FooterFunction } from "../Component/Modules/Foot";

const PrivateRoute = ({ allowedRoles }) => {
  const { user } = useSelector((state) => state.auth);

  const hasRequiredRole = () => {
    if (!allowedRoles) {
      return true;
    }

    const returnUser =
      user?.role?.some((role) => allowedRoles.includes(role)) || false;
    console.log("ReturnUser : " + returnUser);
    return returnUser;
  };

  if (allowedRoles && !hasRequiredRole()) {
    return <Navigate to="/unauthorized" />;
  }

  return user ? (
    <div>
      <HeaderFunction />
      <Outlet />
      <FooterFunction />
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;

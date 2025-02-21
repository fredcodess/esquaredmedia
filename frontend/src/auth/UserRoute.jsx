import { Navigate, Outlet } from "react-router-dom";
import { authStore } from "../store/authStore";

const UserRoute = () => {
  const { authUser } = authStore();

  if (authUser?.isAdmin) {
    return <Navigate to="/products" />;
  }

  return <Outlet />;
};

export default UserRoute;

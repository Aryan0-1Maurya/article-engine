import { Navigate, Outlet } from "react-router-dom";
import useAuthStatus from "../hooks/useAuthStatus";
import Loader from "./Loader";

const PrivateRoute = () => {
  const { authenticated, loading } = useAuthStatus();
  if (loading) {
    return <Loader />;
  }
  return authenticated ? <Outlet /> : <Navigate to='/sign-in' />;
};

export default PrivateRoute;

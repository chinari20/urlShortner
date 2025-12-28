import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../../redux/slices/User";

const PrivateRoute = () => {
  const token = useSelector(getToken);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;

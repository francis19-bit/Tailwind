import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
// import { selectLoginStatus } from "../statemanager/slices/LoginUserDataSlice";
import { useEffect } from "react";
import { selectLoginStatus } from "../statemanager/slices/LoginUserSlice";

const PrivateRoutes = () => {
  const navigate = useNavigate();
  let auth = useSelector(selectLoginStatus);
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    if (!auth && !currentPath.toLocaleLowerCase().includes("admin")) {
      navigate("/login");
    }
  }, [auth, currentPath]);

  return auth ? <Outlet /> : null;
};

export default PrivateRoutes;

import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
// import { selectLoginStatus } from "../statemanager/slices/LoginUserDataSlice";
import { useEffect } from "react";
import { selectAdminLoginStatus } from "../statemanager/slices/AdminLoginUserSlice";

const AdminPrivateRoutes = () => {
  const navigate = useNavigate();
  let auth = useSelector(selectAdminLoginStatus);
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    // alert(currentPath);
    if (!auth && currentPath.includes("Admin")) {
      console.log(auth);
      navigate("/Admin_login");
    }
  }, [auth, currentPath]);

  return auth ? <Outlet /> : null;
};

export default AdminPrivateRoutes;

import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import PrivateRoutes from "./utilities/PrivateRoute";
import Home from "./screens/Home";
import Dashboard from "./screens/Dashboard";
import InsuranceProducts from "./screens/InsuranceProducts";
import UpcomingRenewals from "./screens/UpcomingRenewals";
import ClaimsHistory from "./screens/ClaimsHistory";
import Help from "./screens/Help";
import AdminHome from "./Admin/screens/AdminHome";
import AdminDashboard from "./Admin/screens/AdminDashboard";
import AdminInsuranceProducts from "./Admin/screens/AdminInsuranceProducts";
import AdminUpcomingRenewals from "./Admin/screens/AdminUpcomingRenewals";
import AdminClaimsHistory from "./Admin/screens/AdminClaimsHistory";
import AdminHelp from "./Admin/screens/AdminHelp";
import AdminClients from "./Admin/screens/AdminClient";
import AdminMessages from "./Admin/screens/AdminMessages";
import AdminClientDetails from "./Admin/screens/AdminClientDetails";
import AdminPemiumsHistory from "./Admin/screens/AdminPemiumsHistory";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import AdminLogin from "./Admin/screens/AdminLogin";
import AdminSignup from "./Admin/screens/AdminSignup";
import AdminPrivateRoutes from "./utilities/AdminPrivateRoute";
import PremiumsHistory from "./screens/PremiumsHistory";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Automatic navigation to "/dashboard" when the root route is accessed
  // navigate("/dashboard");

  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === "/") {
      navigate("/dashboard");
    }
  }, [location]);

  return (
    <Routes>
      {/* USERS PRIVATE ROUTES */}
      <Route element={<PrivateRoutes />}>
        <Route element={<Home />} path="/">
          <Route element={<Dashboard />} path="/dashboard" />
          <Route element={<InsuranceProducts />} path="/insurance_products" />
          <Route element={<UpcomingRenewals />} path="/upcoming_renewals" />
          <Route element={<ClaimsHistory />} path="/claims_history" />
          <Route element={<PremiumsHistory />} path="/premiums_history" />
          <Route element={<Help />} path="/help" />
        </Route>
      </Route>
      {/* // ADMIN PRIVATE ROUTES */}
      <Route element={<AdminPrivateRoutes />}>
        <Route element={<AdminHome />} path="Admin-Panel">
          <Route element={<AdminDashboard />} path="dashboard" />
          <Route element={<AdminClients />} path="clients" />
          <Route
            element={<AdminClientDetails />}
            path="clients-details/:clientId"
          />

          <Route
            element={<AdminInsuranceProducts />}
            path="insurance_products"
          />
          <Route element={<AdminUpcomingRenewals />} path="upcoming_renewals" />
          <Route element={<AdminClaimsHistory />} path="claims_history" />
          <Route element={<AdminPemiumsHistory />} path="premiums_history" />
          <Route element={<AdminMessages />} path="messages" />
          <Route element={<AdminHelp />} path="help" />
        </Route>
      </Route>

      {/* // NON-PROTECTED ROUTES */}
      <Route element={<Login />} path="/login" />
      <Route element={<Signup />} path="/signup" />
      <Route element={<AdminLogin />} path="/Admin_login" />
      <Route element={<AdminSignup />} path="/Admin_signup" />
    </Routes>
  );
}

export default App;

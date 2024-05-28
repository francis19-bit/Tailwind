import {
  Button,
  Card,
  TextField,
  InputAdornment,
  Avatar,
  IconButton,
} from "@mui/material";
import imageLogo from "../../../public/irisk logo 1.png";
import {
  Add,
  ChatBubbleOutlineOutlined,
  CurrencyExchange,
  Dashboard,
  DoorBackOutlined,
  Help,
  HelpOutlineOutlined,
  LocalMall,
  Paid,
  Payments,
  PaymentsOutlined,
  PeopleOutlineOutlined,
  Redeem,
  RedeemOutlined,
  RequestQuote,
  RequestQuoteOutlined,
  Search,
  Speed,
  WorkHistoryOutlined,
} from "@mui/icons-material";
import abstractImage from "../../assets/abstract.jpg";

import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAdminLoginUserDetails,
  setAdminLoginStatus,
  setAdminLoginUserDetails,
} from "../../statemanager/slices/AdminLoginUserSlice";
import Users_TemporaryDrawer from "../components/Drawer/Users_TemporaryDrawer";

const AdminHome = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [doubleLinkStatus, setDoubleLinkStatus] = useState(false);

  const AdminLoginDetails = useSelector(selectAdminLoginUserDetails);

  const { FirstName, LastName } = AdminLoginDetails || {};

  useEffect(() => {
    if (
      location.pathname.includes("/Admin-Panel/clients") ||
      location.pathname.startsWith("/Admin-Panel/clients-details")
    ) {
      setDoubleLinkStatus(true);
    } else {
      setDoubleLinkStatus(false);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    dispatch(setAdminLoginStatus(false));
    dispatch(setAdminLoginUserDetails({}));
    navigate("/Admin_login");
  };

  return (
    <div
      className="lg:w-[100%] lg:h-[100vh] lg:flex lg:flex-row lg:gap-[3vw] 
      md:w-[100%] md:h-[100vh] md:flex md:flex-row md:gap-[3vw]
      sm:w-[100%] sm:h-[100vh] sm:flex sm:flex-row sm:gap-[3vw]
      "
      style={{
        width: "100%",
        // height: "100vh",
        // display: "flex",
        padding: "4vh 3vw",
        background: "#FAFBFF",
        // gap: "3vw",
      }}
    >
      <div
        className="lg:basis-[23%] lg:flex lg:flex-col md:basis-[23%]  sm:basis-[23%] sm:hidden"
        style={{
          // flex: ".23",
          background: "white",
          // display: "flex",
          // flexDirection: "column",
          paddingLeft: "2vw",
          borderRadius: "1vw",
        }}
      >
        {/* Drawer */}

        <div
          style={{
            flex: ".15",
            display: "flex",
            gap: "1.5vw",
            // background: "red",
          }}
        >
          <img src={imageLogo} style={{ height: "40px" }} /> <h2>Dashboard</h2>
        </div>
        <div
          style={{
            flex: ".55",
            display: "flex",
            flexDirection: "column",
            gap: "1.5vh",
          }}
        >
          <NavLink to="/Admin-Panel/dashboard">
            <Button
              color="primary"
              className="NavBarBtns"
              style={{
                textTransform: "none",
                borderRadius: ".5vw",

                // color: "#9FA4BC",

                width: "17.4vw",
                height: "6.5vh",
                paddingRight: "7vw",
              }}
              startIcon={<Speed />}
            >
              Dashboard
            </Button>
          </NavLink>

          <NavLink to="/Admin-Panel/clients">
            <Button
              color="primary"
              className={`NavBarBtns`}
              style={{
                textTransform: "none",
                borderRadius: ".5vw",
                width: "17.4vw",
                height: "6.5vh",
                paddingRight: "9vw",

                backgroundColor: doubleLinkStatus == true ? "#5932ea" : "",
                color: doubleLinkStatus == true ? "white" : "",
              }}
              startIcon={<PeopleOutlineOutlined />}
            >
              Clients
            </Button>
          </NavLink>

          <NavLink to="/Admin-Panel/insurance_products">
            <Button
              color="primary"
              className="NavBarBtns"
              style={{
                textTransform: "none",
                borderRadius: ".5vw",
                width: "17.4vw",
                height: "6.5vh",
                paddingRight: "3vw",
              }}
              startIcon={<RedeemOutlined />}
            >
              Insurance Products
            </Button>
          </NavLink>

          <NavLink to="/Admin-Panel/upcoming_renewals">
            <Button
              className="NavBarBtns"
              color="primary"
              style={{
                textTransform: "none",
                borderRadius: ".5vw",
                width: "17.4vw",
                height: "6.5vh",
                paddingRight: "2.5vw",
              }}
              startIcon={<RequestQuoteOutlined />}
            >
              Upcoming Renewals
            </Button>
          </NavLink>

          <NavLink to="/Admin-Panel/claims_history">
            <Button
              color="primary"
              className="NavBarBtns"
              style={{
                textTransform: "none",
                borderRadius: ".5vw",
                width: "17.4vw",
                height: "6.5vh",
                paddingRight: "5.5vw",
              }}
              startIcon={<PaymentsOutlined />}
            >
              Claims history
            </Button>
          </NavLink>

          <NavLink to="/Admin-Panel/premiums_history">
            <Button
              color="primary"
              className="NavBarBtns"
              style={{
                textTransform: "none",
                borderRadius: ".5vw",
                width: "17.4vw",
                height: "6.5vh",
                paddingRight: "3.8vw",
              }}
              startIcon={<WorkHistoryOutlined />}
            >
              Premiums History
            </Button>
          </NavLink>

          <NavLink to="/Admin-Panel/messages">
            <Button
              color="primary"
              className="NavBarBtns"
              style={{
                textTransform: "none",
                borderRadius: ".5vw",
                width: "17.4vw",
                height: "6.5vh",
                paddingRight: "7.5vw",
              }}
              startIcon={<ChatBubbleOutlineOutlined />}
            >
              Messages
            </Button>
          </NavLink>

          <NavLink to="/Admin-Panel/help">
            <Button
              className="NavBarBtns"
              color="primary"
              style={{
                textTransform: "none",
                borderRadius: ".5vw",
                width: "17.4vw",
                height: "6.5vh",
                paddingRight: "10vw",
              }}
              startIcon={<HelpOutlineOutlined />}
            >
              Help
            </Button>
          </NavLink>

          <Button
            onClick={handleLogout}
            className="NavBarBtns"
            color="primary"
            style={{
              textTransform: "none",
              borderRadius: ".5vw",
              width: "17.4vw",
              height: "6.5vh",
              paddingRight: "9vw",
            }}
            startIcon={<DoorBackOutlined />}
          >
            Logout
          </Button>
        </div>
        <div style={{ flex: ".3" }}> </div>
      </div>

      <div className="lg:basis-[77%] lg:flex lg:flex-col md:basis-[100%]   sm:basis-[100%]">
        <div style={{ flex: ".1" }}>
          <div
            style={{
              display: "flex",
              gap: "1vw",
              float: "left",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
              <div className="lg:hidden sm:block">
                {/* Drawer */}
                <Users_TemporaryDrawer />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 20,
                  alignItems: "center",
                }}
              >
                <Avatar src="" />
                <span>
                  Hello {AdminLoginDetails?.FirstName}
                  {LastName} (Admin) 👋 ,
                </span>{" "}
              </div>
            </div>
          </div>
          <TextField
            sx={{ float: "right" }}
            id="outlined-basic"
            variant="outlined"
            size="small"
            label="Search"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            startIcon={<Search />}
          ></TextField>
        </div>

        <div
          style={{
            flex: ".9",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;

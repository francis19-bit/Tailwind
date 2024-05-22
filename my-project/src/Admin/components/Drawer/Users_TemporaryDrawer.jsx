import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import imageLogo from "../../../../logos/logo.png";
import {
  ChatBubbleOutlineOutlined,
  Close,
  DoorBackOutlined,
  HelpOutlineOutlined,
  Menu,
  PaymentsOutlined,
  PeopleOutlineOutlined,
  PersonAddAlt1,
  RedeemOutlined,
  RequestQuoteOutlined,
  Speed,
  WorkHistoryOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@mui/material";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  selectAdminLoginUserDetails,
  setAdminLoginStatus,
  setAdminLoginUserDetails,
} from "../../../statemanager/slices/AdminLoginUserSlice";
import { useEffect, useState } from "react";

export default function Users_TemporaryDrawer() {
  const [state, setState] = useState({
    right: false,
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

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

  const list = (anchor) => (
    <Box
      //   className="cardBackground primaryTextColor"
      sx={{
        width: "100%",
        height: "100%",
        padding: "3vh 1vw",
        display: "flex",
        flexDirection: "column",
        // zIndex: "10000",
      }}
      role="presentation"
      //   onClick={toggleDrawer(anchor, false)}
      //   onKeyDown={toggleDrawer(anchor, false)}
    >
      {/* // Header  */}
      <div onClick={toggleDrawer(anchor, false)}>
        <div
          className="sm:flex sm:flex-col "
          style={{
            // flex: ".23",
            background: "white",
            // display: "flex",
            // flexDirection: "column",
            //   paddingLeft: "2vw",
            //   borderRadius: "1vw",
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
            <img src={imageLogo} style={{ height: "40px" }} />{" "}
            <h2>Dashboard</h2>
          </div>
          <div
            style={{
              flex: ".55",
              display: "flex",
              flexDirection: "column",
              gap: "1.5vh",
            }}
          >
            <NavLink
              to="/Admin-Panel/dashboard"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <Button
                color="primary"
                className="NavBarBtns"
                style={{
                  textTransform: "none",
                  borderRadius: ".5vw",

                  // color: "#9FA4BC",

                  width: "40.4vw",
                  height: "6.5vh",
                  //   paddingRight: "7vw",
                }}
                startIcon={<Speed />}
              >
                Dashboard
              </Button>
            </NavLink>

            <NavLink
              to="/Admin-Panel/clients"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <Button
                color="primary"
                className={`NavBarBtns`}
                style={{
                  //   textTransform: "none",
                  //   borderRadius: ".5vw",
                  //   width: "17.4vw",
                  //   height: "6.5vh",
                  //   paddingRight: "9vw",

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
                // style={{
                //   textTransform: "none",
                //   borderRadius: ".5vw",
                //   width: "17.4vw",
                //   height: "6.5vh",
                //   paddingRight: "3vw",
                // }}
                startIcon={<RedeemOutlined />}
              >
                Insurance Products
              </Button>
            </NavLink>

            <NavLink
              to="/Admin-Panel/upcoming_renewals"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <Button
                className="NavBarBtns"
                color="primary"
                // style={{
                //   textTransform: "none",
                //   borderRadius: ".5vw",
                //   width: "17.4vw",
                //   height: "6.5vh",
                //   paddingRight: "2.5vw",
                // }}
                startIcon={<RequestQuoteOutlined />}
              >
                Upcoming Renewals
              </Button>
            </NavLink>

            <NavLink to="/Admin-Panel/claims_history">
              <Button
                color="primary"
                className="NavBarBtns"
                // style={{
                //   textTransform: "none",
                //   borderRadius: ".5vw",
                //   width: "17.4vw",
                //   height: "6.5vh",
                //   paddingRight: "5.5vw",
                // }}
                startIcon={<PaymentsOutlined />}
              >
                Claims history
              </Button>
            </NavLink>

            <NavLink
              to="/Admin-Panel/premiums_history"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <Button
                color="primary"
                className="NavBarBtns"
                // style={{
                //   textTransform: "none",
                //   borderRadius: ".5vw",
                //   width: "17.4vw",
                //   height: "6.5vh",
                //   paddingRight: "3.8vw",
                // }}
                startIcon={<WorkHistoryOutlined />}
              >
                Premiums History
              </Button>
            </NavLink>

            <NavLink to="/Admin-Panel/messages">
              <Button
                color="primary"
                className="NavBarBtns"
                // style={{
                //   textTransform: "none",
                //   borderRadius: ".5vw",
                //   width: "17.4vw",
                //   height: "6.5vh",
                //   paddingRight: "7.5vw",
                // }}
                startIcon={<ChatBubbleOutlineOutlined />}
              >
                Messages
              </Button>
            </NavLink>

            <NavLink
              to="/Admin-Panel/help"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <Button
                className="NavBarBtns"
                color="primary"
                // style={{
                //   textTransform: "none",
                //   borderRadius: ".5vw",
                //   width: "17.4vw",
                //   height: "6.5vh",
                //   paddingRight: "10vw",
                // }}
                startIcon={<HelpOutlineOutlined />}
              >
                Help
              </Button>
            </NavLink>

            <Button
              onClick={handleLogout}
              className="NavBarBtns"
              color="primary"
              //   style={{
              //     textTransform: "none",
              //     borderRadius: ".5vw",
              //     width: "17.4vw",
              //     height: "6.5vh",
              //     paddingRight: "9vw",
              //   }}
              startIcon={<DoorBackOutlined />}
            >
              Logout
            </Button>
          </div>
          <div style={{ flex: ".3" }}>{/* <Admin_TemporaryDrawer /> */}</div>
        </div>
      </div>

      {/* //Search and Filter Sections */}
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* <Button>{anchor} sat </Button> */}

          {/* <PlayerProfileAdd clickFunction={toggleDrawer(anchor, true)} /> */}
          <Menu onClick={toggleDrawer(anchor, true)} />

          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { Card, IconButton } from "@mui/material";
import imageLogo from "../../../../logos/logo.png";
import {
  DoorBackOutlined,
  HelpOutlineOutlined,
  Menu,
  PaymentsOutlined,
  RedeemOutlined,
  RequestQuoteOutlined,
  Speed,
  WorkHistoryOutlined,
} from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setLoginStatus,
  setLoginUserDetails,
} from "../../../statemanager/slices/LoginUserSlice";

export default function Admin_TemporaryDrawer() {
  const [state, setState] = React.useState({
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setLoginStatus(false));
    dispatch(setLoginUserDetails({}));
    navigate("/login");
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        padding: "3vh 1vw",

        zIndex: "10000",
      }}
      role="presentation"
      //   onClick={toggleDrawer(anchor, false)}
      //   onKeyDown={toggleDrawer(anchor, false)}
      // onClick={toggleDrawer(anchor, false)}
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
            // paddingLeft: "2vw",
            // borderRadius: "1vw",
            // backgroundColor: "red",
          }}
        >
          <div style={{ flex: ".15", display: "flex", gap: "1.5vw" }}>
            <img src={imageLogo} style={{ height: "40px" }} />{" "}
            <h2>Dashboard</h2>
            <div>{/* className="lg:hidden" */}</div>
          </div>
          <div
            style={{
              flex: ".55",
              display: "flex",
              flexDirection: "column",
              gap: "1.5vh",
              alignItems: "center",
            }}
          >
            {/* <Link to="/Admin-Panel/dashboard">
            <Button>Admin</Button>
          </Link> */}

            <NavLink
              to="/dashboard"
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
                }}
                startIcon={<Speed />}
              >
                Dashboard
              </Button>
            </NavLink>

            <NavLink
              to="/insurance_products"
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
                //   paddingRight: "3vw",
                // }}
                startIcon={<RedeemOutlined />}
              >
                Insurance Products
              </Button>
            </NavLink>

            <NavLink to="/upcoming_renewals">
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

            <NavLink
              to="/claims_history"
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
                //   paddingRight: "5.5vw",
                // }}
                startIcon={<PaymentsOutlined />}
              >
                Claims history
              </Button>
            </NavLink>

            <NavLink
              to="/premiums_history"
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
                //   paddingRight: "4vw",
                // }}
                startIcon={<WorkHistoryOutlined />}
              >
                Premiums History
              </Button>
            </NavLink>
            <NavLink
              to="/help"
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
              // style={{
              //   textTransform: "none",
              //   borderRadius: ".5vw",
              //   width: "17.4vw",
              //   height: "6.5vh",
              //   paddingRight: "9vw",
              // }}
              startIcon={<DoorBackOutlined />}
            >
              Logout
            </Button>
          </div>
          <div style={{ flex: ".3" }}>
            <div> </div>
            <Card
              // onClick={() => {

              // }}
              sx={{
                width: 210,
                height: 100,
                marginTop: "2vh",
                paddingTop: "1vh",
                paddingLeft: ".6vw",
                paddingRight: ".6vw",
                display: "flex",
                flexDirection: "column",
                borderRadius: "1.5vw",
                // background:
                //   "linear-gradient(59deg, rgba(7,127,141,1) 0%, rgba(37,142,154,1) 19%, rgba(54,164,176,1) 37%, rgba(13,129,142,1) 55%, rgba(35,141,153,1) 73%, rgba(66,157,167,1) 100%)",
                backgroundImage:
                  "linear-gradient(90deg, rgba(232,169,240,1) 0%, rgba(218,158,239,1) 19%, rgba(185,131,238,1) 33%, rgba(148,99,236,1) 48%, rgba(124,80,235,1) 63%, rgba(89,50,234,1) 81%)",
                // background: "#1B1E2B",
                color: "white",
                cursor: "pointer",
                justifyContent: "center",
                alignItems: "center",
                gap: "2vh",
              }}
            >
              <h4>Connect with us</h4>

              <Button
                sx={{
                  background: "white",
                  borderRadius: "3vw",
                  width: "10vw",
                  height: "4.5vh",
                  textTransform: "none",
                  fontWeight: "bolder",
                  color: "#765BEF",
                }}
              >
                {" "}
                Live chat{" "}
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* <Button>{anchor} sat </Button> */}

          <IconButton>
            <Menu onClick={toggleDrawer(anchor, true)} sx={{ fontSize: 30 }} />
          </IconButton>

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

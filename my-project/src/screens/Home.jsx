import {
  Button,
  Card,
  TextField,
  InputAdornment,
  Avatar,
  IconButton,
} from "@mui/material";
import imageLogo from "../../logos/logo.png";
import {
  Add,
  CurrencyExchange,
  Dashboard,
  DoorBackOutlined,
  Help,
  HelpOutlineOutlined,
  LocalMall,
  Paid,
  Payments,
  PaymentsOutlined,
  Redeem,
  RedeemOutlined,
  RequestQuote,
  RequestQuoteOutlined,
  Search,
  Speed,
  WorkHistoryOutlined,
} from "@mui/icons-material";
import abstractImage from "../assets/abstract.jpg";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLoginUserDetails,
  setLoginStatus,
  setLoginUserDetails,
} from "../statemanager/slices/LoginUserSlice";
import Admin_TemporaryDrawer from "../Admin/components/Drawer/Admin_TemporaryDrawer";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginUserDetails = useSelector(selectLoginUserDetails);
  
  const { ProfileImage, ContactName, CompanyName } = loginUserDetails || {};

  const handleLogout = () => {
    dispatch(setLoginStatus(false));
    dispatch(setLoginUserDetails({}));
    navigate("/login");
  };

  return (
    <div
      className="lg:w-[100%] lg:h-[100vh] lg:flex lg:flex-row lg:gap-[3vw] 
      md:w-[100%] md:h-[100vh] md:flex md:flex-row md:gap-[3vw]
      sm:w-[100%] sm:h-[100vh] sm:flex sm:flex-row sm:gap-[3vw]
      "
      style={{
        // background: "red",
        // width: "100%",
        // height: "100vh",
        // display: "flex",
        padding: "4vh 3vw",
        background: "#FAFBFF",
        // gap: "3vw",
      }}
    >
      {/* whole set of navigation bar */}
      <div
        className="lg:basis-[23%] lg:flex lg:flex-col md:basis-[23%]  sm:basis-[23%] sm:hidden"
        style={{
          // flex: ".23",
          background: "white",
          // display: "flex",
          // flexDirection: "column",
          paddingLeft: "2vw",
          borderRadius: "1vw",
          // backgroundColor: "red",
        }}
      >
        <div style={{ flex: ".15", display: "flex", gap: "1.5vw" }}>
          <img src={imageLogo} style={{ height: "40px" }} /> <h2>Dashboard</h2>
          <div>{/* className="lg:hidden" */}</div>
        </div>
        <div
          style={{
            flex: ".55",
            display: "flex",
            flexDirection: "column",
            gap: "1.5vh",
          }}
        >
          {/* <Link to="/Admin-Panel/dashboard">
            <Button>Admin</Button>
          </Link> */}

          <NavLink to="/dashboard">
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

          <NavLink to="/insurance_products">
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

          <NavLink to="/upcoming_renewals">
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

          <NavLink to="/claims_history">
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

          <NavLink to="/premiums_history">
            <Button
              color="primary"
              className="NavBarBtns"
              style={{
                textTransform: "none",
                borderRadius: ".5vw",
                width: "17.4vw",
                height: "6.5vh",
                paddingRight: "4vw",
              }}
              startIcon={<WorkHistoryOutlined />}
            >
              Premiums History
            </Button>
          </NavLink>
          <NavLink to="/help">
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
      
      {/* Contents */}
      <div
        className="lg:basis-[77%] lg:flex lg:flex-col md:basis-[100%]   sm:basis-[100%]"
        // style={{ display: "flex", flexDirection: "column"   <Admin_TemporaryDrawer /> }}
      >
        <div style={{ flex: ".1" }}>
          <div
            style={{
              display: "flex",
              gap: "1vw",
              float: "left",
              alignItems: "center",
              // background: "red",
            }}
          >
            <div style={{display:"flex", gap:20, alignItems:"center"}}>
            <div className="lg:hidden sm:block">
              {/* Drawer */}
              <Admin_TemporaryDrawer />
            </div>
           <div style={{display:"flex", flexDirection:"row",gap:20, alignItems:"center"}}>
           <Avatar src={ProfileImage} /> <span>Hello {ContactName} 👋,</span>{" "}
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

export default Home;

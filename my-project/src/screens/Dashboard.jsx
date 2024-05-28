import {
  Button,
  Card,
  TextField,
  InputAdornment,
  Avatar,
  IconButton,
} from "@mui/material";
import {
  Add,
  CurrencyExchange,
  // Dashboard,
  Help,
  LocalMall,
  Paid,
  Search,
  Speed,
} from "@mui/icons-material";
import abstractImage from "../assets/abstract.jpg";

import { Outlet } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../statemanager/slices/DatabaseSlice";
import moment from "moment/moment";
import { db } from "../Firebase/Firebase";
import { selectLoginUserDetails } from "../statemanager/slices/LoginUserSlice";

const Dashboard = () => {
  const [AllPremiums, setAllPremiums] = useState([]);
  const [AllClaims, setAllClaims] = useState([]);
  const [allPolicies, setAllPolicies] = useState([]);
  const [filteredPolicyBasedOnExpiryDate, setFilteredPolicyBasedOnExpiryDate] =
    useState([]);

  const LoginDetails = useSelector(selectLoginUserDetails);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const policies = [];
        const querySnapshot = await getDocs(
          collection(db, `users_db/${LoginDetails?.AccountId}/Policy`)
        );
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          policies.push(doc.data());
        });

        setAllPolicies(policies);
      } catch (error) {
        console.error("Error fetching policies:", error);
      }
    };

    fetchData();
  }, [LoginDetails]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const premiums = [];
        const querySnapshot = await getDocs(
          collection(db, `users_db/${LoginDetails?.AccountId}/Premiums`)
        );
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          premiums.push(doc.data());
        });

        setAllPremiums(premiums);
      } catch (error) {
        console.error("Error fetching permiums:", error);
      }
    };

    fetchData();
  }, [LoginDetails]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const claims = [];
        const querySnapshot = await getDocs(
          collection(db, `users_db/${LoginDetails?.AccountId}/Claims`)
        );
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          claims.push(doc.data());
        });

        setAllClaims(claims);
      } catch (error) {
        console.error("Error fetching policies:", error);
      }
    };

    fetchData();
  }, [LoginDetails]);

  useEffect(() => {
    const today = moment(); // Current date
    const twoWeeksFromNow = moment().add(20000, "weeks");

    const filteredDate = allPolicies.filter((item) => {
      // Parse 'dateExpiring' using Moment.js
      const dateExpiring = moment(item.ExpirationDate, "MMMM DD, YYYY");

      // Check if 'dateExpiring' falls within the next two weeks
      return dateExpiring.isBetween(today, twoWeeksFromNow);
    });

    setFilteredPolicyBasedOnExpiryDate(filteredDate);
  }, [allPolicies]);

  return (
    <div
      className="lg:w-[100%] lg:h-[100%] sm:w-[100%] sm:h-[100vh] sm:flex sm:flex-col sm:gap-[1vh] 
      tb:w-[100%] tb:h-[100vh] tb:flex tb:flex-col tb:gap-[1vh]
      md:w-[100%] md:h-[100vh] md:flex md:flex-col md:gap-[1vh]
      "
    >
      <div className="sm:basis-[20%]  tb:basis-[20%]">
        <Card
          className="sm:h-[30vh] sm:w-[100%] sm:flex-col sm:flex sm:p-[3vh] sm:gap-[9vw] sm:justify-center 
          tb:h-[12vh] tb:w-[100%] tb:flex-row tb:flex tb:p-[3vh] tb:gap-[9vw] tb:justify-center
          "
          sx={{
            width: "100%",
            height: "100%",
            // background: "red",
            // display: "flex",
            // padding: "3vh",
            // gap: "9vw",
            // justifyContent: "center",
          }}
        >
          <div
            style={{
              flex: ".25",
              display: "flex",
              paddingLeft: "1vw",
            }}
          >
            <div style={{ flex: ".3" }}>
              {" "}
              <IconButton style={{ background: "#DBFFEC" }}>
                <CurrencyExchange sx={{ color: "#1CB663" }} />{" "}
              </IconButton>
            </div>
            <div style={{ flex: ".7" }}>
              <h6 className="tb:text-[1em] lg:text-[.9em]">No of policies</h6>{" "}
              <h2>{allPolicies.length}</h2>{" "}
            </div>
          </div>
          <div
            style={{
              flex: ".25",

              display: "flex",
              paddingLeft: "1vw",

              borderLeft: "1px solid #F4F4F4",
            }}
          >
            <div style={{ flex: ".3" }}>
              {" "}
              {/* <Avatar src={} />{" "} */}
              <IconButton style={{ background: "#CBF2FF" }}>
                <Paid style={{ color: "#327BCD" }} />{" "}
              </IconButton>
            </div>
            <div style={{ flex: ".7" }}>
              {" "}
              <h6 className="tb:text-[1em]  lg:text-[.9em]">Claims</h6>{" "}
              <h2>
                {
                  AllClaims.filter(
                    (data) => data.PaymentStatus === "Outstanding"
                  ).length
                }
              </h2>{" "}
            </div>
          </div>

          <div
            style={{
              flex: ".28",

              display: "flex",
              paddingLeft: "1vw",

              borderLeft: "1px solid #F4F4F4",
            }}
          >
            <div style={{ flex: ".3" }}>
              {" "}
              <IconButton style={{ background: "#FFBAE0" }}>
                <LocalMall style={{ color: "#DA001A" }} />{" "}
              </IconButton>
            </div>
            <div style={{ flex: ".7" }}>
              <h6 className="tb:text-[1em]  lg:text-[.9em]">Outstanding Premium</h6>{" "}
              <h2>
                {
                  AllPremiums.filter(
                    (data) => data.PaymentStatus === "Outstanding"
                  ).length
                }
              </h2>{" "}
            </div>
          </div>
        </Card>
      </div>

      <div className="sm:basis-[20%]  tb:basis-[20%]">
        <Card
          className="sm:h-[5vh]sm:w-[100%] sm:flex-col sm:flex sm:p-[3vh] sm:gap-[9vw] sm:justify-center 
          
          tb:h-[12vh] tb:w-[100%] tb:flex-row tb:flex tb:p-[3vh] tb:gap-[9vw] tb:justify-center"
          sx={{
            width: "100%",
            height: "100%",
            // background: "red",
            // display: "flex",
            // padding: "3vh",
            // gap: "9vw",
            // justifyContent: "center",
          }}
        >
          <div
            style={{
              flex: ".25",
              display: "flex",
              paddingLeft: "1vw",
            }}
          >
            <div style={{ flex: ".3" }}>
              {" "}
              <IconButton style={{ background: "#DBFFEC" }}>
                <CurrencyExchange sx={{ color: "#1CB663" }} />{" "}
              </IconButton>
            </div>
            <div style={{ flex: ".7" }}>
              {" "}
              <h6 className="tb:text-[1em]  lg:text-[.9em]">Upcoming Renewals</h6>{" "}
              <h2>{filteredPolicyBasedOnExpiryDate.length}</h2>{" "}
            </div>
          </div>
          <div
            style={{
              flex: ".25",

              display: "flex",
              paddingLeft: "1vw",

              borderLeft: "1px solid #F4F4F4",
            }}
          >
            <div style={{ flex: ".3" }}>
              {" "}
              {/* <Avatar src={} />{" "} */}
              <IconButton style={{ background: "#FFBAE0" }}>
                <LocalMall style={{ color: "#DA001A" }} />{" "}
              </IconButton>
            </div>
            <div style={{ flex: ".7" }}>
              {" "}
              <h6 className="tb:text-[1em]  lg:text-[.9em]">Outstanding </h6> <h2>13</h2>{" "}
            </div>
          </div>

          <div
            style={{
              flex: ".28",
              display: "flex",
              paddingLeft: "1vw",

              borderLeft: "1px solid #F4F4F4",
            }}
          >
            <div style={{ flex: ".3" }}>
              {" "}
              {/* <IconButton>
              <Speed />{" "}
            </IconButton> */}
            </div>
            <div style={{ flex: ".7" }}>
              {" "}
              {/* <h6>No of policies</h6> <h2>13</h2>{" "} */}
            </div>
          </div>
        </Card>
      </div>

      {/* Upcoming Renewals & Claims History */}
      <div className="tb:basis-[60%]  sm:flex sm:flex-col sm:basis-[60%] sm:gap-[1vw]">
        <Card
          className="sm:basis-[50%]  sm:flex sm:flex-col sm:p-[1vw] 
          tb:basis-[50%]  tb:flex tb:flex-row tb:p-[1vw]
          "
          style={
            {
              // flex: ".5",
              // display: "flex",
              // flexDirection: "column",
              // padding: "1vw",
            }
          }
        >
          <div
            className="sm:basis-[20%] sm:flex-shrink-0 tb:basis-[10%] tb:flex-shrink-0"
            // style={{ background: "red" }}
          >
            <div
              style={{
                display: "flex",
                gap: "1vw",
                float: "left",
                alignItems: "center",
              }}
            >
              {" "}
              <h3 className="tb:text-[1em] lg:text-[.9em]">Upcoming Renewals</h3>
            </div>
            <TextField
              sx={{ float: "right", width: 200 }}
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

          {/* /// conent taqble */}

          <div className="sm:basis-[80%] sm:p-[0%] sm:flex-shrink-0 tb:basis-[90%] tb:flex-shrink-0 tb:p-[1%]">
            <table>
              <thead>
                {" "}
                {/* style={{ width: "17.4vw" }} */}
                <th align="left" className="sm:w-[19.4vw] tb:text-[1em]  lg:text-[.9em]">
                  Product Name
                </th>{" "}
                {/* style={{ width: "10vw" }} */}
                <th align="left" className="sm:w-[8vw] tb:text-[1em] lg:text-[.9em]">
                  Description
                </th>{" "}
                <th className="tb:text-[1em] lg:text-[.9em]">Premium </th>{" "}
              </thead>
              <tbody className="lg:text-[.9em] sm:text-[.9em] sm:gap-[2vh] tb:text-[1.2em] tb:gap-[2vh]">
                <tr
                // style={{ paddingTop: "4vh" }}
                >
                  {" "}
                  <td
                    className="sm:width-[17.4vw] sm:flex sm:gap-[.5vw]  
                  tb:width-[17.4vw] tb:flex tb:gap-[.5vw]
                  "
                  >
                    <div
                      className="tb:w-[15vw] lg:w-[10vw]"
                      style={{
                        flex: ".6",
                        background: `url(${abstractImage})`,
                        backgroundSize: "cover",
                        borderRadius: ".4vw",
                      }}
                    >
                      {/* <Avatar /> */}
                    </div>
                    <div style={{display:"flex", alignItems:"flex-start", flexDirection:"column"}}>
                      <p style={{ margin: 0, fontWeight:"800" }}> Motor Insurance</p>
                      <span style={{ fontSize: ".8em" }}>totyota elantra</span>
                    </div>
                  </td>{" "}
                  <td>
                    {" "}
                    <p style={{ margin: 0 , fontWeight:"800"}}> Motor Insurance</p>
                    <span style={{ fontSize: ".8em" }}>totyota elantra</span>
                  </td>
                  <td>1,299</td>
                </tr>
                <tr
                // style={{ paddingTop: "1vh" }}
                >
                  {" "}
                  <td
                    className="sm:width-[17.4vw] sm:flex sm:gap-[.5vw]  
                  tb:width-[17.4vw] tb:flex tb:gap-[.5vw]
                  "
                  >
                    <div
                     className="tb:w-[15vw] lg:w-[10vw]"
                      style={{
                        flex: ".6",
                        background: `url(${abstractImage})`,
                        backgroundSize: "cover",
                        borderRadius: ".4vw",
                      }}
                    >
                      {/* <Avatar /> */}
                    </div>
                    <div style={{display:"flex", alignItems:"flex-start", flexDirection:"column"}}>
                      <p className="tb:text-[1.1em]" style={{ margin: 0, fontWeight:"800" }}>
                        {" "}
                        Motor Insurance
                      </p>
                      <span style={{ fontSize: ".8em" }}>totyota elantra</span>
                    </div>
                  </td>{" "}
                  <td>
                    {" "}
                    <p style={{ margin: 0, fontWeight:"800" }}> Motor Insurance</p>
                    <span style={{ fontSize: ".8em" }}>totyota elantra</span>
                  </td>
                  <td>1,299</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        <Card
          className="  sm:basis-[50%] sm:flex sm:flex-col sm:p-[1vw] 
          tb:basis-[50%]  tb:flex tb:flex-row tb:p-[1vw]
          "
          style={
            {
              // flex: ".5",
              // display: "flex",
              // flexDirection: "column",
              // padding: "1vw",
            }
          }
        >
          <div className="sm:basis-[20%] sm:flex-shrink-0 tb:basis-[10%] tb:flex-shrink-0">
            <div
              style={{
                display: "flex",
                gap: "1vw",
                float: "left",
                alignItems: "center",
              }}
            >
              {" "}
              <h3 className="tb:text-[1em] lg:text-[.9em]">Claims history</h3>
            </div>
            <TextField
              sx={{ float: "right", width: 200 }}
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

          {/* /// conent taqble */}

          <div className="sm:basis-[80%] sm:p-[0%] sm:flex-shrink-0 tb:basis-[90%] tb:flex-shrink-0 tb:p-[1%]">
            <table>
              <thead>
                {" "}
                {/* style={{ width: "17.4vw" }} className="tb:text-[1.2em]" */}
                <th align="left" className="sm:w-[19.4vw] tb:text-[1em] lg:text-[.9em]">
                  Product Name
                </th>{" "}
                {/* style={{ width: "10vw" }} */}
                <th align="left" className="sm:w-[8vw] tb:text-[1em]">
                  Description
                </th>{" "}
                <th className="tb:text-[1em] lg:text-[.9em]">Premium </th>{" "}
              </thead>
              <tbody className="lg:text-[.9em] sm:text-[.9em] sm:gap-[2vh] tb:text-[1em] tb:gap-[2vh]">
                <tr style={{ paddingBottom: "4vh" }}>
                  {" "}
                  {/* style={{ width: "17.4vw", display: "flex", gap: ".5vw" }} */}
                  <td className="sm:width-[17.4vw] sm:flex sm:gap-[.5vw]">
                    <div
                      className="tb:w-[15vw]  lg:w-[10vw]"
                      style={{
                        flex: ".6",
                        background: `url(${abstractImage})`,
                        backgroundSize: "cover",
                        borderRadius: ".4vw",
                      }}
                    >
                      {/* <Avatar /> */}
                    </div>
                    <div style={{display:"flex", alignItems:"flex-start", flexDirection:"column"}}>
                      <p style={{ margin: 0, fontWeight:"800" }}> Motor Insurance</p>
                      <span style={{ fontSize: ".8em" }}>totyota elantra</span>
                    </div>
                  </td>{" "}
                  <td>
                    {" "}
                    <p style={{ margin: 0, fontWeight:"800" }}> Motor Insurance</p>
                    <span style={{ fontSize: ".8em" }}>totyota elantra</span>
                  </td>
                  <td>1,299</td>
                </tr>
                <tr
                // style={{ paddingTop: "1vh" }} className="sm:text-[.9em] sm:gap-[2vh] tb:text-[1.2em] tb:gap-[2vh]"
                >
                  {" "}
                  <td className="sm:width-[17.4vw] sm:flex sm:gap-[.5vw]">
                    <div
                      className="tb:w-[15vw]"
                      style={{
                        flex: ".6",
                        background: `url(${abstractImage})`,
                        backgroundSize: "cover",
                        borderRadius: ".4vw",
                      }}
                    >
                      {/* <Avatar /> */}
                    </div>
                    <div  style={{display:"flex", alignItems:"flex-start", flexDirection:"column"}}>
                      <p style={{ margin: 0, fontWeight:"800" }} > Motor Insurance</p>
                      <span style={{ fontSize: ".8em" }}>totyota elantra</span>
                    </div>
                  </td>{" "}
                  <td>
                    {" "}
                    <p style={{ margin: 0 , fontWeight:"800"}}> Motor Insurance</p>
                    <span style={{ fontSize: ".8em" }}>totyota elantra</span>
                  </td>
                  <td>1,299</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

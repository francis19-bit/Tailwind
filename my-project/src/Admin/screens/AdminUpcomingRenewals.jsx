import {
  Button,
  Card,
  TextField,
  InputAdornment,
  Avatar,
  IconButton,
  Pagination,
  Tooltip,
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
  DocumentScanner,
  PictureAsPdf,
  PictureAsPdfOutlined,
} from "@mui/icons-material";
import abstractImage from "../../assets/abstract.jpg";
// import { db } from "../../fireBase/FireBase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../../statemanager/slices/DatabaseSlice";
import MakeClaimModal from "../components/Modals/MakeClaimModal";
import PayPremiumModal from "../components/Modals/PayPremiumModal";
import BasicSelect from "../components/Selects/BasicSelect";
import moment from "moment/moment";
import { db } from "../../Firebase/Firebase";

const AdminUpcomingRenewals = () => {
  const [allPolicies, setAllPolicies] = useState([]);
  const [filteredPolicyBasedOnExpiryDate, setFilteredPolicyBasedOnExpiryDate] =
    useState([]);
  const [datePeriod, setDatePeriod] = useState(2);

  const AllUsers = useSelector(selectAllUsers);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const policies = [];
        for (const userId of AllUsers) {
          const querySnapshot = await getDocs(
            collection(db, `users_db/${userId?.AccountId}/Policy`)
          );
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            policies.push(doc.data());
          });
        }
        setAllPolicies(policies);
      } catch (error) {
        console.error("Error fetching policies:", error);
      }
    };

    fetchData();
  }, [AllUsers]);

  useEffect(() => {
    const today = moment(); // Current date
    const twoWeeksFromNow = moment().add(datePeriod, "weeks");

    const filteredDate = allPolicies.filter((item) => {
      // Parse 'dateExpiring' using Moment.js
      const dateExpiring = moment(item.ExpirationDate, "MMMM DD, YYYY");

      // Check if 'dateExpiring' falls within the next two weeks
      return dateExpiring.isBetween(today, twoWeeksFromNow);
    });

    setFilteredPolicyBasedOnExpiryDate(filteredDate);
  }, [datePeriod, allPolicies]);

  console.log();

  console.log(filteredPolicyBasedOnExpiryDate);

  const UsersPerPage = 4;

  const [currentPage, setCurrentPage] = useState(1);

  const getTotalPages = () =>
    Math.ceil(filteredPolicyBasedOnExpiryDate.length / UsersPerPage);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const getPoliciesPerPage = () => {
    const startIndex = (currentPage - 1) * UsersPerPage;
    const endIndex = startIndex + UsersPerPage;
    return filteredPolicyBasedOnExpiryDate.slice(startIndex, endIndex);
  };

  const renewalPeriodFromToday = ["2 weeks", "4 weeks", "8 weeks", "1 year"];

  return (
    <div
      className="sm:w-[100%] sm:flex sm:flex-col sm:h-[100vh] 
      lg:w-[100%] lg:flex lg:flex-col lg:h-[100%]

      tb:flex tb:flex-col tb:h-[100vh]
      md:flex md:flex-col md:h-[100vh]
      "
      style={{
        width: "100%",
        height: "100%",
        background: "white",
        display: "flex",
        flexDirection: "column",
        gap: "1vh",
        borderRadius: "1vw",
        padding: "2vh 1vw",
      }}
    >
      {/* // HEader and search */}
      <div style={{ flex: ".1" }}>
        <h2 style={{ float: "left", marginRight: "2vw" }}>
          {" "}
          Upcoming Renewals
        </h2>{" "}
        <div className="lg:ml-[50%] sm:ml-[37%] tb:ml-[0%]">
          <BasicSelect
            onChange={(e) => {
              if (e === "2 weeks") {
                setDatePeriod(2);
              } else if (e === "4 weeks") {
                setDatePeriod(4);
              } else if (e === "8 weeks") {
                setDatePeriod(8);
              } else if (e === "1 year") {
                setDatePeriod(52);
              }
            }}
            selectSize={"small"}
            inputStyle={{ float: "left" }}
            label="Products expiring in"
            defaultSelect="2 weeks"
            itemsArray={renewalPeriodFromToday}
          />
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
      </div>

      {/* Table */}

      <div
        className="sm:basis-[70%] tb:text-[1.2em]  lg:basis-[80%]"
        style={{
          // flex: ".8",
          display: allPolicies.length === 0 ? "flex" : "",
          justifyContent: allPolicies.length === 0 ? "center" : "",
          fontSize: ".8em",
        }}
      >
        {allPolicies.length === 0 ? (
          <h3>No upcoming renewals withing the next 3 weeks</h3>
        ) : (
          <table>
            <thead>
              {" "}
              <th align="left" style={{ width: "9.4vw" }}>
                Beneficiary
              </th>{" "}
              <th align="left" style={{ width: "8vw" }}>
                Risk Type
              </th>{" "}
              <th align="left">Inception Date </th>
              <th align="left">Expiration Date </th>
              <th align="left">Product Description </th>
              <th align="left">Document </th>
              <th align="left">Actions </th>
            </thead>
            <tbody style={{ fontSize: ".9em", gap: "2vh" }}>
              {getPoliciesPerPage().map((data, key) => {
                const {
                  PolicyId,
                  PolicyDescription,
                  RiskClass,
                  RiskType,
                  InceptionDate,
                  ExpirationDate,
                  PolicyDocument,
                  CreatedFor,
                  CreatedBy,
                  DateCreated,
                } = data;

                return (
                  <PolicyRow
                    key={key}
                    RiskClass={RiskClass}
                    RiskType={RiskType}
                    InceptionDate={InceptionDate}
                    ExpirationDate={ExpirationDate}
                    PolicyDescription={PolicyDescription}
                    Document={PolicyDocument}
                    PolicyId={PolicyId}
                    PolicyOwner={CreatedFor}
                  />
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <div style={{ flex: ".1", display: "grid", placeItems: "center" }}>
        <Pagination
          className="primaryTextColor"
          sx={{ color: "white" }}
          count={getTotalPages()}
          color="primary"
          page={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default AdminUpcomingRenewals;

const PolicyRow = ({
  RiskClass,
  RiskType,
  InceptionDate,
  ExpirationDate,
  PolicyDescription,
  Document,
  PolicyId,
  PolicyOwner,
}) => {
  // const PolicyOwner

  const AllUsers = useSelector(selectAllUsers);

  const filteredUser = AllUsers.find((data) => data?.AccountId === PolicyOwner);

  console.log("filtered User", filteredUser);

  return (
    <tr
      key={filteredUser?.AccountId}
      // style={{ paddingTop: "4vh" }}
    >
      {" "}
      <td
        style={{
          width: "9.4vw",
          display: "flex",
          gap: ".5vw",
          marginTop: "1vh",
          textWrap: "wrap",
          wordWrap: "wrap",
        }}
      >
        <div>
          {/* <Tooltip title={RiskClass?.length > 30 ? RiskClass : ""}>
            <br />
            <p style={{ margin: 0 }}> {RiskClass?.slice(0, 15)} </p>
            <span>
              {RiskClass?.substring(15, 30)}
              {RiskClass?.length > 31 ? "..." : ""}
            </span>
          </Tooltip> */}

          <div
            style={{
              background:
                filteredUser?.ProfileImage === ""
                  ? "black"
                  : `url(${filteredUser?.ProfileImage})`,
              width: "4vw",
              height: "8vh",
              borderRadius: ".4vw",
              marginBottom: ".5vh",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              // backgroundAttachment: "fixed",
            }}
          ></div>

          {filteredUser?.CompanyName}
          {/* {RiskClass} */}
        </div>
      </td>{" "}
      <td style={{ textWrap: "wrap", wordWrap: "wrap" }}>{RiskType}</td>
      <td> {InceptionDate} </td>
      <td> {ExpirationDate} </td>
      <td style={{ textWrap: "wrap", wordWrap: "wrap" }}>
        {PolicyDescription?.length > 35 ? (
          <Tooltip title={PolicyDescription}>
            {PolicyDescription?.substring(0, 35)}...
          </Tooltip>
        ) : (
          PolicyDescription
        )}
      </td>
      <td>
        <IconButton
          onClick={() => {
            window.open(Document, "_blank");
          }}
        >
          <PictureAsPdfOutlined color="primary" />
        </IconButton>
      </td>
      <td>
        {/* // PolicyDetails={{
        //   PolicyId: PolicyId,
        //   PolicyDescription: PolicyDescription,
        //   RiskType: RiskType,
        //   RiskClass: RiskClass,
        //   PolicyOwner: PolicyOwner,
        // }} */}
        <MakeClaimModal PolicyId={PolicyId} />
        {/* <br /> */}
        <PayPremiumModal PolicyId={PolicyId} />
      </td>
    </tr>
  );
};

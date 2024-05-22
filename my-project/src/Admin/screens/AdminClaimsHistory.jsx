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
import imageLogo from "../../../public/irisk logo 1.png";
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
// import { db } from "../../fireBase/FireBase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../../statemanager/slices/DatabaseSlice";
import { db } from "../../Firebase/Firebase";

const AdminClaimsHistory = () => {
  const [AllClaims, setAllClaims] = useState([]);

  const AllUsers = useSelector(selectAllUsers);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const policies = [];
        for (const userId of AllUsers) {
          const querySnapshot = await getDocs(
            collection(db, `users_db/${userId?.AccountId}/Claims`)
          );
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            policies.push(doc.data());
          });
        }
        setAllClaims(policies);
      } catch (error) {
        console.error("Error fetching policies:", error);
      }
    };

    fetchData();
  }, [AllUsers]);

  const UsersPerPage = 4;

  const [currentPage, setCurrentPage] = useState(1);

  const getTotalPages = () => Math.ceil(AllClaims.length / UsersPerPage);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const getClaimsPerPage = () => {
    const startIndex = (currentPage - 1) * UsersPerPage;
    const endIndex = startIndex + UsersPerPage;
    return AllClaims.slice(startIndex, endIndex);
  };

  return (
    <div
      className="sm:w-[100vh]"
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
      <div className="sm:basis-[30%]">
        <h2 className=" md:text-[1.3em]" style={{ float: "left" }}>
          {" "}
          Claims History
        </h2>{" "}
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

      {/* Table */}

      <div
        className="lg:text-[1em] sm:basis-[70%] tb:text-[1.1em] md:text-[1.3em]"
        style={{
          // flex: ".8",
          display: AllClaims.length === 0 ? "flex" : "",
          justifyContent: AllClaims.length === 0 ? "center" : "",
          // fontSize: ".8em",
        }}
      >
        {AllClaims.length === 0 ? (
          <h3>No claims created yet</h3>
        ) : (
          <table>
            <thead>
              <tr>
                <th align="left" style={{ width: "9.4vw" }}>
                  Beneficiary
                </th>{" "}
                <th align="left" style={{ width: "10vw" }}>
                  Policy
                </th>
                <th align="left" style={{ width: "10vw" }}>
                  Claim Amount
                </th>
                <th align="left">Date of Loss</th>
                <th align="left">Payment Status</th>
                <th align="left">Payment Date</th>
                <th align="left">Document</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: ".9em", gap: "2vh" }}>
              {getClaimsPerPage().map((data, key) => (
                <UserClaimRow key={key} {...data} />
              ))}
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

export default AdminClaimsHistory;

const UserClaimRow = ({
  PolicyId,
  ClaimAmount,
  DateOfLoss,
  PaymentStatus,
  PaymentDate,
  ClaimDocument,
  CreatedFor,
}) => {
  const AllUsers = useSelector(selectAllUsers);

  const filteredUser = AllUsers.find((data) => data?.AccountId === CreatedFor);

  return (
    <tr key={filteredUser?.AccountId}>
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
      <td>{PolicyId}</td>
      <td>{ClaimAmount}</td>
      <td>{DateOfLoss}</td>
      <td>{PaymentStatus}</td>
      <td>{PaymentDate}</td>
      <td>
        <IconButton
          onClick={() => {
            window.open(ClaimDocument, "_blank");
          }}
        >
          <PictureAsPdfOutlined color="primary" />
        </IconButton>
      </td>
    </tr>
  );
};

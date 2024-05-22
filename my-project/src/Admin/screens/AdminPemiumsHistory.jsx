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
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../../statemanager/slices/DatabaseSlice";
import { db } from "../../Firebase/Firebase";

const AdminPemiumsHistory = () => {
  const [AllPremiums, setAllPremiums] = useState([]);

  const AllUsers = useSelector(selectAllUsers);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const permiums = [];
        for (const userId of AllUsers) {
          const querySnapshot = await getDocs(
            collection(db, `users_db/${userId?.AccountId}/Premiums`)
          );
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            permiums.push(doc.data());
          });
        }
        setAllPremiums(permiums);
      } catch (error) {
        console.error("Error fetching permiums:", error);
      }
    };

    fetchData();
  }, [AllUsers]);

  const UsersPerPage = 4;

  const [currentPage, setCurrentPage] = useState(1);

  const getTotalPages = () => Math.ceil(AllPremiums.length / UsersPerPage);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const getPremiumsPerPage = () => {
    const startIndex = (currentPage - 1) * UsersPerPage;
    const endIndex = startIndex + UsersPerPage;
    return AllPremiums.slice(startIndex, endIndex);
  };

  return (
    <div
      className="sm:h-[100vh] "
      style={{
        width: "100%",
        // height: "100%",
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
          Premiums History
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
        className="sm:basis-[70%] tb:text-[1.1em] md:text-[1.3em]"
        style={{
          // flex: ".8",
          display: AllPremiums.length === 0 ? "flex" : "",
          justifyContent: AllPremiums.length === 0 ? "center" : "",
          fontSize: ".8em",
        }}
      >
        {AllPremiums.length === 0 ? (
          <h3>No premiums created yet</h3>
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
                  Pemium Amount
                </th>
                <th align="left">Date Received</th>
                <th align="left">Payment Status</th>
                <th align="left">Document</th>
                <th align="left">Comments</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: ".9em", gap: "2vh" }}>
              {getPremiumsPerPage().map((data, key) => (
                <UserPremiumRow key={key} {...data} />
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

export default AdminPemiumsHistory;

const UserPremiumRow = ({
  PolicyId,
  PremiumId,
  PremiumAmount,
  DateReceived,
  Comments,
  PaymentStatus,
  PremiumDocument,
  CreatedFor,
  CreatedBy,
  DateCreated,
}) => {
  const AllUsers = useSelector(selectAllUsers);

  const filteredUser = AllUsers.find((data) => data?.AccountId === CreatedFor);

  return (
    <tr>
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
      <td>{PremiumAmount}</td>
      <td>{DateReceived}</td>
      <td>{PaymentStatus}</td>
      <td>
        <IconButton
          onClick={() => {
            window.open(PremiumDocument, "_blank");
          }}
        >
          <PictureAsPdfOutlined color="primary" />
        </IconButton>
      </td>
      <td>{Comments}</td>
    </tr>
  );
};

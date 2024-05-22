import { Search } from "@mui/icons-material";
import {
  Button,
  InputAdornment,
  Pagination,
  TextField,
  Tooltip,
} from "@mui/material";
import abstractImage from "../../assets/abstract.jpg";
import CreateClientProfileModal from "../components/Modals/UploadClientModal";
import EditClientModal from "../components/Modals/EditClientModal";
import CreateNewInsuranceProduct from "../components/Modals/CreateNewInsuranceProduct";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../../statemanager/slices/DatabaseSlice";
import { useState } from "react";

const AdminClients = () => {
  const navigate = useNavigate();

  const AllUsers = useSelector(selectAllUsers);

  const UsersPerPage = 4;

  const [currentPage, setCurrentPage] = useState(1);

  const getTotalPages = () => Math.ceil(AllUsers.length / UsersPerPage);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const getUsersPerPage = () => {
    const startIndex = (currentPage - 1) * UsersPerPage;
    const endIndex = startIndex + UsersPerPage;
    return AllUsers.slice(startIndex, endIndex);
  };

  return (
    <div
      className="sm:w-[100%] sm:h-[100vh] sm:flex sm:flex-col"
      style={{
        // width: "100%",
        // height: "100%",
        background: "white",
        // display: "flex",
        // flexDirection: "column",
        gap: "1vh",
        borderRadius: "1vw",
        padding: "2vh 1vw",
      }}
    >
      {/* // HEader and search */}
      <div style={{ flex: ".1" }}>
        <h2 style={{ float: "left", marginRight: "2vw" }}>Clients</h2>{" "}
        <CreateClientProfileModal />{" "}
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

      <div style={{ flex: ".8" }}>
        <table className="sm:w-[100%]" style={{ fontSize: ".85em" }}>
          <thead>
            {" "}
            <th align="left">Company Name</th>{" "}
            <th align="left">Contact Name </th>{" "}
            <th align="left">Email Address </th>{" "}
            <th align="left">Type of business </th>{" "}
            <th align="left">Location </th> <th align="left">Actions </th>{" "}
          </thead>
          <tbody
            style={{
              fontSize: ".9em",
              gap: "2vh",
              // display: "flex",
              // flexDirection: "column",
            }}
          >
            {getUsersPerPage().map((data, index) => {
              const {
                AccountId,
                Email,
                BusinessType,
                Location,
                ContactName,
                CompanyName,
                DateCreated,
                ProfileImage,
                PhoneNumber,
              } = data;

              return (
                <UserTableRow
                  key={index}
                  AccountId={AccountId}
                  Email={Email}
                  BusinessType={BusinessType}
                  Location={Location}
                  ContactName={ContactName}
                  CompanyName={CompanyName}
                  DateCreated={DateCreated}
                  ProfileImage={ProfileImage}
                  PhoneNumber={PhoneNumber}
                />
              );
            })}
          </tbody>
        </table>
      </div>

      <div
        style={{
          flex: ".1",
          // background: "red",
          display: "grid",
          placeItems: "center",
        }}
      >
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

export default AdminClients;

const UserTableRow = ({
  AccountId,
  Email,
  BusinessType,
  Location,
  ContactName,
  CompanyName,
  DateCreated,
  ProfileImage,
  PhoneNumber,
}) => {
  const navigate = useNavigate();

  return (
    <tr
      // className="sm:flex sm:flex-row sm:gap-[.5em]"
      style={{ minheight: "5vh", cursor: "pointer" }}
    >
      {" "}
      <td
        style={{
          display: "flex",
          gap: ".5vw",
          // alignItems: "center",
          // alignContent: "center",
          // justifyContent: "center",
          paddingTop: "2vh",
        }}
        onClick={() => {
          navigate(`/Admin-Panel/clients-details/${AccountId}`);
        }}
      >
        <div
          key={AccountId}
          style={{
            flex: ".5",
            // width: "17.4vw",

            minWidth: "4vw",
            height: "10vh",
            background: ProfileImage === "" ? "gray" : `url(${ProfileImage})`,

            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            borderRadius: ".4vw",
          }}
        >
          {/* <Avatar /> */}
        </div>
        <div>
          <br />
          <Tooltip title={CompanyName.length > 30 ? CompanyName : ""}>
            <p style={{ margin: 0 }}> {CompanyName.slice(0, 15)} </p>
            <span style={{ fontSize: ".8em" }}>
              {CompanyName.substring(15, 30)}
              {CompanyName.length > 31 ? "..." : ""}
            </span>
            {/* <p> &nbsp; </p> */}
          </Tooltip>
        </div>
      </td>{" "}
      <td
        onClick={() => {
          navigate(`/Admin-Panel/clients-details/${AccountId}`);
        }}
      >
        <Tooltip title={ContactName.length > 30 ? ContactName : ""}>
          <br />
          <p style={{ margin: 0 }}> {ContactName.slice(0, 15)} </p>
          <span style={{ fontSize: ".8em" }}>
            {ContactName.substring(15, 30)}
            {ContactName.length > 31 ? "..." : ""}
          </span>
          <p> &nbsp; </p>
        </Tooltip>
      </td>
      <td
        onClick={() => {
          navigate(`/Admin-Panel/clients-details/${AccountId}`);
        }}
      >
        <Tooltip title={Email.length > 30 ? Email : ""}>
          {Email.length < 30 ? Email : `${Email.slice(0, 30)}...`}{" "}
        </Tooltip>
      </td>
      <td
        onClick={() => {
          navigate(`/Admin-Panel/clients-details/${AccountId}`);
        }}
      >
        <Tooltip title={BusinessType.length > 35 ? BusinessType : ""}>
          {BusinessType.length < 35
            ? BusinessType
            : `${BusinessType.slice(0, 35)}...`}{" "}
        </Tooltip>
      </td>
      <td
        onClick={() => {
          navigate(`/Admin-Panel/clients-details/${AccountId}`);
        }}
      >
        <Tooltip title={Location.length > 30 ? Location : ""}>
          {Location.length < 30 ? Location : `${Location.slice(0, 30)}...`}{" "}
        </Tooltip>
      </td>
      <td>
        <EditClientModal
          ClientData={{
            AccountId: AccountId,
            Email: Email,
            BusinessType: BusinessType,
            Location: Location,
            ContactName,
            CompanyName,
            DateCreated,
            ProfileImage,
            PhoneNumber,
          }}
        />
      </td>
    </tr>
  );
};

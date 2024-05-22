import React, { useEffect, useState } from "react";
import {
  IconButton,
  InputAdornment,
  Pagination,
  TextField,
} from "@mui/material";
import { PictureAsPdfOutlined, Search } from "@mui/icons-material";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../../Firebase/Firebase";
import { useParams } from "react-router-dom";

const ClientClaims = () => {
  const [selectedUserClaims, setSelectedUserClaims] = useState([]);

  const { clientId } = useParams();

  useEffect(() => {
    const selectedUserClaimsCollectionRef = collection(
      db,
      `users_db/${clientId}/Claims`
    );

    const q = query(selectedUserClaimsCollectionRef);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });

      setSelectedUserClaims(items);
    });
    return unsubscribe;
  }, [clientId]);

  useEffect(() => {
    console.log(selectedUserClaims, "claims");
  }, [selectedUserClaims]);

  const UsersPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const getTotalPages = () =>
    Math.ceil(selectedUserClaims.length / UsersPerPage);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const getClaimsPerPage = () => {
    const startIndex = (currentPage - 1) * UsersPerPage;
    const endIndex = startIndex + UsersPerPage;
    return selectedUserClaims.slice(startIndex, endIndex);
  };

  return (
    <div
      style={{
        fontSize: ".8em",
        display: "flex",
        flexDirection: "column",
        width: "67vw",

        height: "57vh",
      }}
    >
      <div style={{ flex: ".1" }}>
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
          flex: ".8",
          display: selectedUserClaims.length === 0 ? "flex" : "",
          justifyContent: selectedUserClaims.length === 0 ? "center" : "",
        }}
      >
        {selectedUserClaims.length === 0 ? (
          <h3>User has no claims created yet</h3>
        ) : (
          <table>
            <thead>
              <tr>
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

export default ClientClaims;

const UserClaimRow = ({
  PolicyId,
  ClaimAmount,
  DateOfLoss,
  PaymentStatus,
  PaymentDate,
  ClaimDocument,
}) => {
  return (
    <tr>
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

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

const ClientPremiums = () => {
  const [selectedUserPremiums, setSelectedUserPremiums] = useState([]);

  const { clientId } = useParams();

  useEffect(() => {
    const selectedUserPremiumsCollectionRef = collection(
      db,
      `users_db/${clientId}/Premiums`
    );

    const q = query(selectedUserPremiumsCollectionRef);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });

      setSelectedUserPremiums(items);
    });
    return unsubscribe;
  }, [clientId]);

  useEffect(() => {
    console.log(selectedUserPremiums, "Premiums");
  }, [selectedUserPremiums]);

  const UsersPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const getTotalPages = () =>
    Math.ceil(selectedUserPremiums.length / UsersPerPage);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const getPremiumsPerPage = () => {
    const startIndex = (currentPage - 1) * UsersPerPage;
    const endIndex = startIndex + UsersPerPage;
    return selectedUserPremiums.slice(startIndex, endIndex);
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
          display: selectedUserPremiums.length === 0 ? "flex" : "",
          justifyContent: selectedUserPremiums.length === 0 ? "center" : "",
        }}
      >
        {selectedUserPremiums.length === 0 ? (
          <h3>User has no premiums created yet</h3>
        ) : (
          <table>
            <thead>
              <tr>
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

export default ClientPremiums;

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
  return (
    <tr>
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

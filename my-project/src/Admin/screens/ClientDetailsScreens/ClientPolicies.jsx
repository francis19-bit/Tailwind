import {
  DocumentScanner,
  PictureAsPdf,
  PictureAsPdfOutlined,
  Search,
} from "@mui/icons-material";
import {
  Button,
  IconButton,
  InputAdornment,
  Pagination,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PayPremiumModal from "../../components/Modals/PayPremiumModal";
import CreateNewInsuranceProduct from "../../components/Modals/CreateNewInsuranceProduct";
import { db } from "../../../Firebase/Firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useParams } from "react-router-dom";
import MakeClaimModal from "../../components/Modals/MakeClaimModal";

const ClientPolicies = () => {
  const [selectedUserPolicies, setselectedUserPolicies] = useState([]);

  const { clientId } = useParams();

  useEffect(() => {
    const selectedUserPoliciesCollectionRef = collection(
      db,
      `users_db/${clientId}/Policy`
    );

    const q = query(selectedUserPoliciesCollectionRef);
    const alldata = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });

      setselectedUserPolicies(items);
    });
    return () => {
      alldata();
    };
  }, [clientId]);

  const UsersPerPage = 4;

  const [currentPage, setCurrentPage] = useState(1);

  const getTotalPages = () =>
    Math.ceil(selectedUserPolicies.length / UsersPerPage);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const getPoliciesPerPage = () => {
    const startIndex = (currentPage - 1) * UsersPerPage;
    const endIndex = startIndex + UsersPerPage;
    return selectedUserPolicies.slice(startIndex, endIndex);
  };

  return (
    <div
      style={{
        fontSize: ".85em",
        display: "flex",
        flexDirection: "column",
        width: "67vw",
        height: "57vh",
        // background: "red",
      }}
    >
      <div style={{ flex: ".1", fontSize: "1em" }}>
        <div style={{ float: "left" }}>
          {" "}
          <CreateNewInsuranceProduct />
        </div>

        <TextField
          sx={{ float: "right" }}
          id="outlined-basic"
          variant="outlined"
          size="small"
          label="Search Policy "
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
          display: selectedUserPolicies.length === 0 ? "flex" : "",
          justifyContent: selectedUserPolicies.length === 0 ? "center" : "",
        }}
      >
        {selectedUserPolicies.length === 0 ? (
          <h3>User has no policy created yet</h3>
        ) : (
          <table>
            <thead>
              {" "}
              <th align="left" style={{ width: "7.4vw" }}>
                Risk Class
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

export default ClientPolicies;

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
  return (
    <tr
    // style={{ paddingTop: "4vh" }}
    >
      {" "}
      <td
        style={{
          width: "5.4vw",
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
          <br />
          {RiskClass}
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

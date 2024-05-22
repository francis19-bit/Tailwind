import React, { useEffect, useState } from "react";
import ClientDetailsTab from "../components/Tabs/ClientDetailsTabs";
import { selectAllUsers } from "../../statemanager/slices/DatabaseSlice";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const AdminClientDetails = () => {
  const ClientTabItemsArray = ["Policies", "Claims", "Premiums"];
  const AllUsers = useSelector(selectAllUsers);

  const [filteredUser, setFilteredUser] = useState([]);
  const { clientId } = useParams();

  useEffect(() => {
    const foundUser = AllUsers.find((data) => data?.AccountId === clientId);

    setFilteredUser(foundUser);
  }, [clientId, AllUsers]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        // background: "green",
        // gap: "1vw",
        borderRadius: "1vw",
        // padding: "2vh 1vw",
      }}
    >
      <div
        style={{ flex: ".15", display: "flex", gap: ".5vw", fontSize: ".9em" }}
      >
        <div
          key={filteredUser?.AccountId}
          style={{
            width: "10vw",
            height: "10vh",
            background:
              filteredUser?.ProfileImage === ""
                ? "black"
                : `url(${filteredUser?.ProfileImage})`,
            borderRadius: ".5vw",
            backgroundSize: "contain",
            // backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            flex: ".1",
          }}
        ></div>{" "}
        <div style={{ flex: ".15" }}>
          {" "}
          <h5> Company Name : </h5>
          {filteredUser?.CompanyName}{" "}
        </div>
        <div style={{ flex: ".15" }}>
          {" "}
          <h5> Contact Name : </h5>
          {filteredUser?.ContactName}{" "}
        </div>
        <div style={{ flex: ".15" }}>
          {" "}
          <h5> Email : </h5>
          {filteredUser?.Email}{" "}
        </div>
        <div style={{ flex: ".15" }}>
          {" "}
          <h5> Type of Business : </h5>
          {filteredUser?.BusinessType}{" "}
        </div>
        <div style={{ flex: ".15" }}>
          {" "}
          <h5> Location : </h5>
          {filteredUser?.Location}{" "}
        </div>
        <div style={{ flex: ".15" }}>
          {" "}
          <h5> Phone Number : </h5>
          {filteredUser?.PhoneNumber}{" "}
        </div>
      </div>
      <div style={{ flex: ".85" }}>
        <ClientDetailsTab ClientTabItemsArray={ClientTabItemsArray} />
      </div>
    </div>
  );
};

export default AdminClientDetails;

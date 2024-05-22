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
  CarCrashOutlined,
  FileOpenOutlined,
  EngineeringOutlined,
  WorkspacePremiumOutlined,
  WhatshotOutlined,
  LocalHospitalOutlined,
} from "@mui/icons-material";
import abstractImage from "../assets/abstract.jpg";
// import { db } from "../fireBase/FireBase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../statemanager/slices/DatabaseSlice";
import MakeClaimModal from "../Admin/components/Modals/MakeClaimModal";
import PayPremiumModal from "../Admin/components/Modals/PayPremiumModal";
import { selectLoginUserDetails } from "../statemanager/slices/LoginUserSlice";
import { db } from "../Firebase/Firebase";

const InsuranceProducts = () => {
  const [RiskClassGroup, setRiskClassGroup] = useState([]);
  const [allPolicies, setAllPolicies] = useState([]);
  const [selectedRiskClass, setSelectedRiskClass] = useState("Accident");

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
    // const groupedData = groupByRiskClass();
    const groupedData = allPolicies.reduce((acc, obj) => {
      const { RiskClass } = obj;
      if (acc[RiskClass]) {
        acc[RiskClass].length++;
      } else {
        acc[RiskClass] = { RiskClass, length: 1 };
      }
      return acc;
    }, {});

    const result = Object.values(groupedData);

    console.log("  Westa  ", result, allPolicies.length);

    setRiskClassGroup(result);
  }, [allPolicies]);

  useEffect(() => {
    console.log(allPolicies, "  sadsa  ", RiskClassGroup);
  }, [RiskClassGroup]);

  const bondPolicy = RiskClassGroup.find(
    (policy) => policy.RiskClass === "Bond"
  ) || { length: 0 };
  const AccidentPolicy = RiskClassGroup.find(
    (policy) => policy.RiskClass === "Accident"
  ) || { length: 0 };
  const FirePolicy = RiskClassGroup.find(
    (policy) => policy.RiskClass === "Fire"
  ) || { length: 0 };
  const HealthPolicy = RiskClassGroup.find(
    (policy) => policy.RiskClass === "Health"
  ) || { length: 0 };
  const LiabilityPolicy = RiskClassGroup.find(
    (policy) => policy.RiskClass === "Liability"
  ) || { length: 0 };
  const EngineeringPolicy = RiskClassGroup.find(
    (policy) => policy.RiskClass === "Engineering"
  ) || { length: 0 };

  /// PAGINATION SETTINGS

  const filteredPolicyBasedOnSelectedRiskClass = allPolicies.filter(
    (data) => data.RiskClass === selectedRiskClass
  );

  const UsersPerPage = 2;

  const [currentPage, setCurrentPage] = useState(1);

  const getTotalPages = () =>
    Math.ceil(filteredPolicyBasedOnSelectedRiskClass.length / UsersPerPage);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const getPoliciesPerPage = () => {
    const startIndex = (currentPage - 1) * UsersPerPage;
    const endIndex = startIndex + UsersPerPage;
    return filteredPolicyBasedOnSelectedRiskClass.slice(startIndex, endIndex);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedRiskClass]);

  return (
    <div
      className="sm:w-[100%] sm:pt-[5%] sm:h-[100vh]  lg:w-[100%] lg:h-[100%]   md:w-[100%]  md:h-[100vh]  tb:w-[100%]  tb:h-[100vh]"
      style={{
        // width: "100%",
        // height: "100%",
        // background: "#FAFBFF",
        display: "flex",
        flexDirection: "column",
        gap: "1vh",
      }}
    >
      <div style={{ flex: ".2" }}>
        <Card
          className="sm:flex sm:h-[100%] sm:flex-col sm:justify-center  
          lg:flex lg:h-[100%] lg:flex-row lg:justify-center
          md:flex md:h-[100%] md:flex-row md:justify-center
          tb:flex tb:h-[100%] tb:flex-row tb:justify-center
          "
          sx={{
            width: "100%",
            // height: 100,
            // background: "red",
            // display: "flex",
            padding: "2vh",
            gap: "1vw",
            // justifyContent: "center",
          }}
        >
          <div
            style={{
              flex: ".33",
              display: "flex",
              paddingLeft: "1vw",
            }}
          >
            <div style={{ flex: ".3" }}>
              {" "}
              <IconButton
                onClick={() => {
                  setSelectedRiskClass("Accident");
                }}
                style={{ background: "#DBFFEC" }}
              >
                <CarCrashOutlined sx={{ color: "#1CB663" }} />{" "}
              </IconButton>
            </div>
            <div style={{ flex: ".7" }}>
              <h6 className="tb:text-[1.2em]">Accident</h6>{" "}
              <h2>{AccidentPolicy.length}</h2>{" "}
            </div>
          </div>
          <div
            style={{
              flex: ".33",

              display: "flex",
              paddingLeft: "1vw",

              borderLeft: "1px solid #F4F4F4",
            }}
          >
            <div style={{ flex: ".3" }}>
              {" "}
              {/* <Avatar src={} />{" "} */}
              <IconButton
                onClick={() => {
                  setSelectedRiskClass("Bond");
                }}
                style={{ background: "#CBF2FF" }}
              >
                <WorkspacePremiumOutlined style={{ color: "#327BCD" }} />{" "}
              </IconButton>
            </div>
            <div style={{ flex: ".7" }}>
              {" "}
              <h6 className="tb:text-[1.2em]">Bonds</h6>{" "}
              <h2>{bondPolicy.length}</h2>{" "}
            </div>
          </div>

          <div
            style={{
              flex: ".34",

              display: "flex",
              paddingLeft: "1vw",

              borderLeft: "1px solid #F4F4F4",
            }}
          >
            <div style={{ flex: ".3" }}>
              {" "}
              <IconButton
                onClick={() => {
                  setSelectedRiskClass("Engineering");
                }}
                style={{ background: "#FFBAE0" }}
              >
                <EngineeringOutlined style={{ color: "#DA001A" }} />{" "}
              </IconButton>
            </div>
            <div style={{ flex: ".7" }}>
              <h6 className="tb:text-[1.2em]"> Engineering </h6>{" "}
              <h2>{EngineeringPolicy.length}</h2>{" "}
            </div>
          </div>
        </Card>
      </div>

      <div style={{ flex: ".2" }}>
        <Card
          className="sm:flex sm:h-[100%] sm:flex-col sm:justify-center 
          lg:flex lg:h-[100%] lg:flex-row lg:justify-center
          md:flex md:h-[100%] md:flex-row md:justify-center
          tb:flex tb:h-[100%] tb:flex-row tb:justify-center
          "
          sx={{
            width: "100%",
            // height: 100,
            // background: "red",
            // display: "flex",
            padding: "3vh",
            gap: "1vw",
            // justifyContent: "center",
          }}
        >
          <div
            style={{
              flex: ".33",
              display: "flex",
              paddingLeft: "1vw",
            }}
          >
            <div style={{ flex: ".3" }}>
              {" "}
              <IconButton
                onClick={() => {
                  setSelectedRiskClass("Fire");
                }}
                style={{ background: "#DBFFEC" }}
              >
                <WhatshotOutlined sx={{ color: "#1CB663" }} />{" "}
              </IconButton>
            </div>
            <div style={{ flex: ".7" }}>
              {" "}
              <h6 className="tb:text-[1.2em]">Fire </h6>{" "}
              <h2>{FirePolicy.length}</h2>{" "}
            </div>
          </div>
          <div
            style={{
              flex: ".33",

              display: "flex",
              paddingLeft: "1vw",

              borderLeft: "1px solid #F4F4F4",
            }}
          >
            <div style={{ flex: ".3" }}>
              {" "}
              {/* <Avatar src={} />{" "} */}
              <IconButton
                onClick={() => {
                  setSelectedRiskClass("Health");
                }}
                style={{ background: "#CBF2FF" }}
              >
                <LocalHospitalOutlined style={{ color: "#327BCD" }} />{" "}
              </IconButton>
            </div>
            <div style={{ flex: ".7" }}>
              {" "}
              <h6 className="tb:text-[1.2em]">Health </h6>{" "}
              <h2>{HealthPolicy.length}</h2>{" "}
            </div>
          </div>

          <div
            style={{
              flex: ".34",

              display: "flex",
              paddingLeft: "1vw",

              borderLeft: "1px solid #F4F4F4",
            }}
          >
            <div style={{ flex: ".3" }}>
              {" "}
              <IconButton
                onClick={() => {
                  setSelectedRiskClass("Liability");
                }}
                style={{ background: "#FFBAE0" }}
              >
                <LocalMall style={{ color: "#DA001A" }} />{" "}
              </IconButton>
            </div>
            <div style={{ flex: ".7" }}>
              <h6 className="tb:text-[1.2em]"> Liability </h6>{" "}
              <h2>{LiabilityPolicy.length}</h2>{" "}
            </div>
          </div>
        </Card>
      </div>
      <div style={{ flex: ".6", gap: "1vw" }}>
        <Card
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            flexDirection: "column",
            padding: "1vw",
          }}
        >
          <div style={{ flex: ".2" }}>
            <div
              style={{
                display: "flex",
                gap: "1vw",
                float: "left",
                alignItems: "center",
              }}
            >
              {" "}
              <h3> {selectedRiskClass} </h3>
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

          <div
            style={{
              flex: ".7",
              display: allPolicies.length === 0 ? "flex" : "",
              justifyContent: allPolicies.length === 0 ? "center" : "",
              fontSize: ".8em",
            }}
          >
            {filteredPolicyBasedOnSelectedRiskClass.length === 0 ? (
              <h3 className="tb:text-[1.2em] flex justify-center items-center">
                No {selectedRiskClass} policy created yet
              </h3>
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
                  <th className="tb:text-[1.2em]" align="left">
                    Inception Date{" "}
                  </th>
                  <th className="tb:text-[1.2em]" align="left">
                    Expiration Date{" "}
                  </th>
                  <th className="tb:text-[1.2em]" align="left">
                    Product Description{" "}
                  </th>
                  <th className="tb:text-[1.2em]" align="left">
                    Document{" "}
                  </th>
                  {/* <th align="left">Actions </th> */}
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
        </Card>
      </div>
    </div>
  );
};

export default InsuranceProducts;

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
      {/* <td>
      
        <MakeClaimModal PolicyId={PolicyId} />

        <PayPremiumModal PolicyId={PolicyId} />
      </td> */}
    </tr>
  );
};

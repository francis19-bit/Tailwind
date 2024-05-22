import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import {
  IconButton,
  Input,
  InputAdornment,
  Pagination,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  AddAPhoto,
  Close,
  Facebook,
  Instagram,
  LocationCityOutlined,
  PictureAsPdfOutlined,
  Search,
  UploadFileOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { v4 as uuidv4, v4 } from "uuid";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  increment,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// import { auth, db, storage } from "../../../../Firebase/Firebase";
import moment from "moment";
// import PhoneInputComponent from "../TextField.jsx/PhoneComponent";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import BasicSelect from "../Selects/BasicSelect";
import DatePickerTool from "../DatePicker/BasicDatePicker";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { db, storage } from "../../../Firebase/Firebase";
import BasicBackdrop from "../Backdrops/BasicBackdrop";
import pdfImage from "../../../assets/images/PDFImage.png";

// Retail Businesses:
// Service-Based Businesses:
// Hospitality and Tourism:
// Technology and IT Services:
// Healthcare and Wellness:
// Manufacturing and Production:
// Financial Services:
// Real Estate and Property Management:
// Construction and Engineering:
// Transportation and Logistics:
// Education and Training:
// Arts and Entertainment:
// Nonprofit Organizations:
// Food and Beverage:
// Agriculture and Farming:

const PaymentStatusArray = ["Paid", "Outstanding"];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "65%",
  height: "75%",
  bgcolor: "background.paper",
  border: "transparent",
  boxShadow: 24,
  borderRadius: "1vw",
  padding: "0vw 4vw",
  display: "flex",
  flexDirection: "column",
  paddingTop: "3vh",
};

// const inputStyles = {
//   width: "85%",
// };

// MODAL TO CREATE A new profile

const PayPremiumModal = ({ PolicyId }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { clientId } = useParams();
  const [dateReceived, setDateReceived] = React.useState("");
  const [paymentStatus, setPaymentStatus] = React.useState("");

  const fileInputRef = useRef(null);
  // const uuid = uuidv4();
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();

  const [submitBtnEnabler, setSubmitBtnEnabler] = React.useState(false);

  // Images States
  const [fileName, setFileName] = React.useState([]);
  const [file, setFile] = React.useState([]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const files = e.dataTransfer.files;
    setFile([...file, ...files], "files");
    const fileNames = [];

    if (file.length > 10) {
      // setMaximumPicturesAlert(true);
    } else {
      for (let i = 0; i < files.length; i++) {
        // Getting a new id for each file
        // const fileId = v4();
        fileNames.push({
          name: files[i].name,
          size: files[i].size,
          // fileId: fileId,
          type: files[i].type,

          lastModified: files[i].lastModified,
          description: "",
          url: URL.createObjectURL(files[i]),
        });
      }

      // setFile([...file, ...files], "files");
      setFileName([...fileName, ...fileNames], "names");
      console.log(fileName, "Names", file);
    }
  };

  // DELETE Image selected
  const handleRemoveImageSelected = (index) => {
    const updatedFiles = [...file];
    updatedFiles.splice(index, 1);
    setFile(updatedFiles);

    const updatedFileNames = [...fileName];
    updatedFileNames.splice(index, 1);
    setFileName(updatedFileNames);
    console.log(file, "left");
  };

  const handleFileSelect = async (event) => {
    const files = event.target.files;
    const fileNames = [];
    console.log(files[0].name);
    await setFile([...file, ...files], "files");

    console.log(files, "SElECTEDF", file);

    if (file.length > 10 || files.length >= 9) {
      // setMaximumPicturesAlert(true);
      // if (file.length < 10) {
      //   ("Do nothing");
      // } else {
      //   setFile([]);
      // }
    } else {
      for (let i = 0; i < files.length; i++) {
        // const fileId = v4();
        fileNames.push({
          name: files[i].name,
          size: files[i].size,
          // fileId: fileId,
          type: files[i].type,

          lastModified: files[i]["lastModified"],
          description: "",
          url: URL.createObjectURL(files[i]),
        });
      }

      // setFile([...file, ...files], "files");
      setFileName([...fileName, ...fileNames], "names");
      console.log(fileName, "Names", file);
    }
  };

  const onSubmit = async (formData, e) => {
    e.preventDefault();

    try {
      const uuid = v4();

      const { PremiumAmount, Comments } = formData;
      if (paymentStatus === "" || dateReceived === "") {
        await Swal.fire({
          icon: "warning",
          title: "All fields required",
          text: "Please make sure all fields are filled",
          customClass: {
            container: "custom-swal-container",
          },
        });
      } else {
        setSubmitBtnEnabler(true);

        let premiumFileUrl = "";

        if (file.length > 0) {
          const selectedFile = file[0];

          const premiumFileRef = ref(
            storage,
            `PremiumDocuments/${
              selectedFile.name +
              "type=" +
              selectedFile.type +
              "-" +
              clientId +
              uuid
            }`
          );

          await uploadBytes(premiumFileRef, selectedFile);

          // Get the download URL
          premiumFileUrl = await getDownloadURL(premiumFileRef);
        }

        const clientRef = doc(db, `users_db/${clientId}/Premiums`, uuid);

        await setDoc(clientRef, {
          PolicyId: PolicyId && PolicyId,
          PremiumId: uuid,
          PremiumAmount: PremiumAmount,
          DateReceived: dateReceived,
          Comments: Comments,
          PaymentStatus: paymentStatus,
          PremiumDocument: premiumFileUrl,
          CreatedFor: clientId,
          CreatedBy: "Admin Account",
          DateCreated: moment().format("YYYY-MM-DD HH:mm:ss"),
        });

        setSubmitBtnEnabler(false);

        await Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Premium created successfully!",
          customClass: {
            container: "custom-swal-container",
          },
        });

        setPaymentStatus("");
        setDateReceived("");
        reset();
        handleClose();
      }
    } catch (error) {
      console.error(error);
      setSubmitBtnEnabler(false);

      await Swal.fire({
        icon: "warning",
        title: "An Error Occured",
        text: "Try again in a few minutes",
        customClass: {
          container: "custom-swal-container",
        },
      });
    }
  };

  const openFileInNewTab = (file) => {
    window.open(URL.createObjectURL(file), "_blank");
  };

  React.useEffect(() => {
    setFileName([]);

    setFile([]);
  }, [open]);

  return (
    <React.Fragment>
      <Button
        sx={{
          background: "blue",
          color: "white",
          border: ".5vw",
          marginBottom: "1vh",
          textTransform: "none",
          marginRight: ".2vw",
          fontSize: ".8em",
          // position: "absolute",
        }}
        onClick={handleOpen}
      >
        Pay Premium
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          className="cardBackground primaryTextColor md:overflow-y-hidden md:flex md:flex-col md:h-[94%] md:w-[80%] sm:w-[100%] sm:h-[100%] sm:flex sm:flex-col sm:overflow-y-scroll"
          sx={{ ...style, paddingBottom: "2vh" }}
        >
          <div style={{ flex: ".3" }}>
            <h2 id="child-modal-title">
              Pay premium for policy with
              <br /> id : {PolicyId} <br />
              {/* Click to view policy */}
              <IconButton>
                <PictureAsPdfOutlined color="primary" />
              </IconButton>
              {/* // ADD A DOCUMENT BUTTON THAT CAN MAKE YOU VIEW THE POLICY DOCUMENT IN ANTOHER TAB */}
              <Button
                sx={{ width: "10%", float: "right" }}
                onClick={handleClose}
              >
                Back
              </Button>
            </h2>
          </div>

          <div style={{ flex: ".7" }}>
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <div style={{ flex: ".8" }}>
                <div
                  // md:basis-[35%]
                  // className="md:w-[100%] md:h-[100%]  md:basis-[80%]   md:flex md:flex-row  sm:basis-[80%] sm:w-[100%] sm:h-[100vh]] sm:flex sm:flex-col"
                  style={{
                    width: "100%",
                    height: "80%",
                    display: "flex",
                    gap: "1vw",
                    // background: "red",
                  }}
                >
                  {/* LEFT INPUT PLAYER DETAILS */}
                  <div
                    //   className="md:w-[100%]  md:flex md:flex-col md:basis-[35%]    sm:w-[100%]  sm:flex sm:flex-col sm:basis-[35%]"
                    style={{
                      flex: ".35",
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      // background: "red",
                    }}
                  >
                    <div
                      style={{
                        flex: "1",
                        display: "flex",
                        gap: "20px",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      {/* <CustomTextField placeholder={"First Name"} />
                <CustomTextField placeholder={"Surname"} />     */}

                      <div>
                        <TextField
                          required
                          id="outlined-basic"
                          // className="md:w-[10vw] sm:w-[100%]"
                          label="Premium Amount"
                          variant="outlined"
                          fullWidth={true}
                          // sx={{ width: "23vw" }}
                          {...register("PremiumAmount", { required: true })}
                        />
                      </div>
                      <div>
                        <BasicSelect
                          label="Payment Status"
                          itemsArray={PaymentStatusArray}
                          onChange={(e) => {
                            setPaymentStatus(e);
                          }}
                        />
                      </div>

                      <div>
                        <DatePickerTool
                          label={"Date Received"}
                          dateValue={(e) => {
                            setDateReceived(
                              e.$d.toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })
                            );
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  {/* MIDDLE INPUT PLAYER DETAILS */}
                  <div
                    className="md:items-center md:flex md:flex-col md:basis-[35%]     sm:items-center sm:flex sm:flex-col sm:basis-[35%]"
                    style={{
                      flex: ".35",
                      display: "flex",
                      gap: "20px",
                      alignItems: "center",
                      flexDirection: "column",
                      // background: "yellow",
                    }}
                  >
                    <TextField
                      required
                      id="outlined-basic"
                      // className="md:w-[10vw] sm:w-[100%]"
                      label="Comments"
                      type="text"
                      variant="outlined"
                      multiline
                      rows={8}
                      fullWidth={true}
                      // sx={{ width: "23vw" }}
                      {...register("Comments", {
                        required: true,
                      })}
                    />
                  </div>
                  {/* RIGHT SELECT IMAGES FROM FILES */}
                  {/* style={{ flex: ".3" }}  */}
                  <div
                    className="md:h-[70vh] md:flex md:flex-col md:basis-[30%]  sm:h-[60vh] sm:flex sm:flex-col sm:basis-[30%]"
                    style={{
                      flex: ".3",
                      // background: "blue",

                      // display: "flex",
                      // gap: "20px",
                      // alignItems: "center",
                      // flexDirection: "column",
                      // background: "yellow",
                    }}
                  >
                    {/* MARKET VALUE RANGE */}

                    {fileName.length === 0 ? (
                      <div
                        //   className="md:w-[23vw] md:flex md:justify-center md:items-center md:self-center md:h-[20vh]      sm:flex sm:justify-center sm:items-center sm:self-center  sm:h-[10vh] sm:w-[100%]"
                        style={{
                          border: "2px dotted",
                          borderRadius: "1vw",
                          width: "100%",
                          height: "15vh",
                          display: "flex",
                          justifyContent: "center",
                          alignSelf: "center",
                          alignItems: "center",
                          marginTop: "2.5vh",
                        }}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current.click()}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyItems: "baseline",
                            gap: 10,
                          }}
                        >
                          <UploadFileOutlined />
                          <Typography sx={{ fontWeight: "600" }}>
                            Select or drop policy document
                          </Typography>
                        </div>

                        {/* ref input */}
                        <div>
                          <input
                            type="file"
                            accept=".jpg, .jpeg, .png, .pdf"
                            // multiple
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                            style={{ display: "none" }}
                          />
                        </div>
                      </div>
                    ) : (
                      fileName.map((data, i) => {
                        const { type, name, url } = data || "";
                        return (
                          <>
                            <div
                              key={i}
                              onClick={() => {
                                if (type.includes("pdf")) {
                                  openFileInNewTab(file[0]);
                                }
                              }}
                              // className="sm:w-[35vw] md:w-[9vw] "
                              style={{
                                width: "9vw",
                                height: "15vh",
                                marginTop: "3vh",
                                backgroundImage: type?.includes("pdf")
                                  ? `url(${pdfImage})`
                                  : `url(${url})`,
                                backgroundSize: type?.includes("pdf")
                                  ? "contain"
                                  : "cover",
                                cursor: type?.includes("pdf") ? "pointer" : "",
                                backgroundRepeat: "no-repeat",
                                borderRadius: "5%",
                                marginBottom: "1%",
                                marginRight: "1.65vw",
                              }}
                              // key={index}
                            >
                              <IconButton
                                onClick={() => {
                                  handleRemoveImageSelected(i);
                                  // alert(`clicked ${i}`);
                                }}
                                className="sm:left-[30vw] md:left-[10vw] "
                                sx={{
                                  postion: "absolute",
                                  width: 20,
                                  height: 20,
                                  color: "red",
                                  // backgroundColor: "white",
                                  // left: "10vw",
                                }}
                              >
                                <Close />
                              </IconButton>
                            </div>
                            <br />
                            {name.length < 25 ? (
                              name
                            ) : (
                              <Tooltip title={name}>
                                {" "}
                                {name.substring(0, 25)}...{" "}
                              </Tooltip>
                            )}
                          </>
                        );
                      })
                    )}

                    {/* // Start Date`` */}
                    {/* <h6 style={{ marginTop: "1.5vh" }}>Contract period</h6> */}
                  </div>
                </div>
              </div>

              {/* {...register("firstName", { required: true })} */}

              <div style={{ flex: ".2" }}>
                <Button
                  className="md:w-[23vw]  md:mt-[2vh]  sm:w-[43vw] sm:mt-[2vh] "
                  type="submit"
                  disabled={submitBtnEnabler}
                  sx={{
                    background: "blue",
                    color: "white",
                    border: ".5vw",
                    marginBottom: "2vh",
                    // position: "absolute",
                  }}
                  variant="contained"
                >
                  Create
                </Button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
      <BasicBackdrop
        enable={submitBtnEnabler}
        message="Creating New Premium Please Wait "
      />
    </React.Fragment>
  );
};

export default PayPremiumModal;

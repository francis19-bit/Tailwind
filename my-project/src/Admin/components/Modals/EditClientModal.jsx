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
  Typography,
} from "@mui/material";
import {
  AddAPhoto,
  Close,
  Facebook,
  Instagram,
  LocationCityOutlined,
  Search,
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
import ReactPhoneInput from "react-phone-input-material-ui";

import Swal from "sweetalert2";
import BasicBackdrop from "../Backdrops/BasicBackdrop";
import { auth, db, storage } from "../../../Firebase/Firebase";

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

const TypesOfBusinessArray = [
  "Retail Businesses",
  "Service-Based Businesses",
  "Hospitality and Tourism",
  "Technology and IT Services",
  "Healthcare and Wellness",
  "Manufacturing and Production",
  "Financial Services",
  "Real Estate and Property Management",
  "Construction and Engineering",
  "Transportation and Logistics",
  "Education and Training",
  "Arts and Entertainment",
  "Nonprofit Organizations",
  "Food and Beverage",
  "Agriculture and Farming",
];

const style = {
  position: "absolute",
  // top: "50%",
  // left: "50%",
  transform: "translate(-50%, -50%)",
  // width: "65%",
  // height: "75%",
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
//
// MODAL TO CREATE A new profile

const EditClientModal = ({ ClientData }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const fileInputRef = useRef(null);
  // const uuid = uuidv4();
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();

  const [submitBtnEnabler, setSubmitBtnEnabler] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = React.useState(
    ClientData?.PhoneNumber?.slice(1, ClientData?.PhoneNumber?.length)
  );

  // Images States
  const [fileName, setFileName] = React.useState([
    { url: ClientData?.ProfileImage },
  ]);
  const [file, setFile] = React.useState([]);
  const [typeOfBusiness, setTypeOfBusiness] = React.useState(
    ClientData?.BusinessType
  );
  ///

  React.useEffect(() => {
    setFileName([{ url: ClientData?.ProfileImage }]);

    setFile([]);

    setTypeOfBusiness(ClientData?.BusinessType);
  }, [open]);

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
    const fileNames = [];
    console.log(files[0].name);
    setFile([files[0]]);

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
          lastModified: files[i]["lastModified"],
          description: "",
          url: URL.createObjectURL(files[i]),
        });
      }

      // setFile([...file, ...files], "files");
      setFileName([fileNames[0]], "names");
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
    await setFile([files[0]]);

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
          lastModified: files[i]["lastModified"],
          description: "",
          url: URL.createObjectURL(files[i]),
        });
      }

      // setFile([...file, ...files], "files");
      setFileName([fileNames[0]], "names");
      console.log(fileName, "Names", file);
    }
  };

  const onSubmit = async (formData, e) => {
    e.preventDefault();

    const { CompanyName, ContactName, Email, Location } = formData;

    console.log(file, "fileSend", file[0]?.name);

    try {
      const uuid = v4();

      if (typeOfBusiness === "") {
        await Swal.fire({
          icon: "warning",
          title: "All fields required",
          text: "Please select a business type",
          customClass: {
            container: "custom-swal-container",
          },
        });
      } else {
        setSubmitBtnEnabler(true);

        const selectedFile = file[0];

        // upload the image to google storage
        // POSSIBLE BUG FIX .. reject any image file name which has %2F or %20 in its name
        let url = "";

        if (file.length > 0) {
          const profileImageRef = ref(
            storage,
            `clientsProfileImage/${selectedFile?.name + "-" + uuid}`
          );

          await uploadBytes(profileImageRef, selectedFile);

          // Get the download URL
          url = await getDownloadURL(profileImageRef);
        }

        const clientRef = doc(db, `users_db`, ClientData?.AccountId);

        await updateDoc(clientRef, {
          CompanyName,
          ContactName,
          Location,
          PhoneNumber: `+${phoneNumber}`,
          BusinessType: typeOfBusiness,
          ProfileImage: file.length > 0 ? url : ClientData?.ProfileImage,
        });

        setSubmitBtnEnabler(false);

        await Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Client updated successfully!",
          customClass: {
            container: "custom-swal-container",
          },
        });
        setTypeOfBusiness("");
        setFileName([]);
        setFile([]);
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

  return (
    <React.Fragment>
      <Button
        sx={{
          background: "blue",
          color: "white",
          border: ".5vw",
          marginBottom: "2vh",
          textTransform: "none",
          marginRight: ".2vw",
          fontSize: ".8em",
          // position: "absolute",
        }}
        onClick={handleOpen}
      >
        Edit
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        {/* width: "65%", */}
        {/* height: "75%", */}
        {/* top: "50%",
        left: "50%", */}
        <Box
          className="lg:top-[50%] lg:left-[50%] tb:w-[100%] tb:top-[50%] tb:left-[50%] cardBackground primaryTextColor md:overflow-y-hidden md:flex md:flex-col md:h-[94%] md:w-[100%] sm:w-[70%] sm:h-[72%] sm:flex sm:flex-col sm:overflow-y-hidden sm:top-[45.5%] sm:left-[63.8%]"
          sx={{ ...style, paddingBottom: "2vh" }}
        >
          <div style={{ flex: ".2" }}>
            <h2 id="child-modal-title">
              Edit client profile
              <Button
                sx={{ width: "10%", float: "right" }}
                onClick={handleClose}
              >
                Back
              </Button>
            </h2>
          </div>

          <div style={{ flex: ".8" }}>
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                // background: "red",
              }}
              // className="sm:flex sm:flex-row"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div style={{ flex: ".8" }}>
                <div
                  // md:basis-[35%]
                  // className="md:w-[100%] md:h-[100%]  md:basis-[80%]   md:flex md:flex-row  sm:basis-[80%] sm:w-[100%] sm:h-[100vh]] sm:flex sm:flex-col"
                  className="lg:flex lg:flex-row sm:flex sm:flex-col sm:h-[100%]"
                  style={{
                    width: "100%",
                    // height: "80%",
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
                          // className="sm:w-[100vw]"
                          label="Company Name"
                          variant="outlined"
                          fullWidth={true}
                          defaultValue={ClientData?.CompanyName}
                          // sx={{ width: "23vw" }}
                          {...register("CompanyName", { required: true })}
                        />
                      </div>
                      <div>
                        <TextField
                          required
                          id="outlined-basic"
                          label="ContactName"
                          // sx={{ width: "23vw" }}
                          variant="outlined"
                          defaultValue={ClientData?.ContactName}
                          fullWidth={true}
                          {...register("ContactName", { required: true })}
                        />
                      </div>

                      <div>
                        <BasicSelect
                          label="Type of Business"
                          itemsArray={TypesOfBusinessArray}
                          defaultSelect={ClientData?.BusinessType}
                          onChange={(e) => {
                            setTypeOfBusiness(e);
                          }}
                        />
                      </div>
                      {/* <DatePickerToolCreateAccount
                      // style={{ width: "23vw" }}
                      containerStyle={{ marginTop: "-1vh" }}
                      label="Date of birth *"
                      // defaultValue={userData.DOB}
                      dateValue={(e) => {
                        setDOB(
                          e.$d.toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        );
                        console.log(
                          e.$d.toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        );
                        //  alert(
                        //     e.$d.toLocaleDateString("en-US", {
                        //       year: "numeric",
                        //       month: "long",
                        //       day: "numeric",
                        //     })
                        //   );
                      }}
                    />
                    <CountrySelect
                      countryCode={(e) => {
                        setCountryCode(e);
                      }}
                      countryName={(e) => {
                        setCountryName(e);
                      }}
                      selectLabel="Nationality *"
                      styles={{
                        minWidth: "23vw",
                        marginLeft: "-0.5vw",
                        marginTop: "1vh",
                      }}
                    /> */}

                      {/* <TextField
                    required
                    id="outlined-basic"
                    label="Height"
                    type="number"
                    variant="outlined"
                    fullWidth={true}
                    className="primaryTextColor"
                    sx={{ width: "23vw" }}
                    {...register("Height", { required: true })}
                  /> */}
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
                    <PhoneField
                      onChange={(e) => {
                        setPhoneNumber(e);
                      }}
                      defaultValue={phoneNumber}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Location"
                      // className="md:w-[23vw]  sm:w-[100%]"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocationCityOutlined />
                          </InputAdornment>
                        ),
                      }}
                      variant="outlined"
                      defaultValue={ClientData?.Location}
                      // sx={{ width: "23vw" }}
                      {...register("Location", { required: true })}
                    />
                    {/* <BasicSelect
                      label="Type of Business"
                      itemsArray={TypesOfBusinessArray}
                      defaultSelect={ClientData?.BusinessType}
                    /> */}
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
                          <AddAPhoto />
                          <Typography sx={{ fontWeight: "600" }}>
                            Select or drag profile Image
                          </Typography>
                        </div>

                        {/* ref input */}
                        <div>
                          <input
                            type="file"
                            accept=".jpg, .jpeg, .png .pdf"
                            // multiple
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                            style={{ display: "none" }}
                          />
                        </div>
                      </div>
                    ) : (
                      fileName.map((data, i) => (
                        <div
                          key={i}
                          // className="sm:w-[35vw] md:w-[9vw] "
                          style={{
                            width: "9vw",
                            height: "15vh",
                            marginTop: "3vh",
                            backgroundImage: `url(${data.url})`,
                            backgroundSize: "cover",
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
                      ))
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
                  Update
                </Button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
      <BasicBackdrop
        message={"Updating Client Data Please Wait"}
        enable={submitBtnEnabler}
      />
    </React.Fragment>
  );
};

export default EditClientModal;
function PhoneField({ defaultCountry, onChange, classes, defaultValue }) {
  // Initialize state to hold the phone number value
  const [phoneNumber, setPhoneNumber] = React.useState(defaultValue);

  // Handle phone number change
  const handlePhoneChange = (value) => {
    setPhoneNumber(value);
    // Call the onChange function passed from the parent component, if provided
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <React.Fragment>
      {/* Render ReactPhoneInput with default value and onChange handler */}
      <ReactPhoneInput
        value={phoneNumber} // Set the value to the state variable
        onChange={handlePhoneChange} // Handle phone number change
        component={TextField}
        defaultCountry={defaultCountry || "gh"}
        dropdownClass="custom-dropdown-class"
        style={{ width: "92%" }}
      />
    </React.Fragment>
  );
}

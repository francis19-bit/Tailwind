import React, { useState } from "react";
import signupcss from "../styles/Signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import mailLogo from "../assets/images/irisklogo.png";
import { v4 as uuidv4, v4 } from "uuid";
import {
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Pagination,
  TextField,
  Typography,
  withStyles,
} from "@mui/material";
import {
  AddAPhoto,
  Close,
  Facebook,
  Instagram,
  LocationCityOutlined,
  Search,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
// import { v4 as uuidv4, v4 } from "uuid";
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
import moment from "moment/moment";
// import PhoneInputComponent from "../TextField.jsx/PhoneComponent";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import BasicSelect from "../Admin/components/Selects/BasicSelect";
import { auth, db, storage } from "../Firebase/Firebase";
import Swal from "sweetalert2";
import { createUserWithEmailAndPassword } from "firebase/auth";
import ReactPhoneInput from "react-phone-input-material-ui";
import {
  setLoginStatus,
  setLoginUserDetails,
} from "../statemanager/slices/LoginUserSlice";

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
const Signup = () => {
  const navigate = useNavigate();
  const uuid = uuidv4();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [submitBtnEnabler, setSubmitBtnEnabler] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [typeOfBusiness, setTypeOfBusiness] = useState("");

  // function to create a new user
  const onSubmit = async (formData, e) => {
    e.preventDefault();

    const { CompanyName, ContactName, Email, Location, PhoneNumber, Password } =
      formData;

    try {
      setSubmitBtnEnabler(true);

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
      }
      setSubmitBtnEnabler(true);

      await createUserWithEmailAndPassword(auth, Email, Password)
        .then(async (userCredential) => {
          const user = userCredential.user;

          const clientRef = doc(db, `users_db`, user.uid);

          // upload the image to google storage
          // POSSIBLE BUG FIX .. reject any image file name which has %2F or %20 in its name

          let profileUrl = "";

          await setDoc(clientRef, {
            AccountId: user.uid,
            CompanyName,
            ContactName,
            Email,
            Location,
            PhoneNumber: `+${phoneNumber}`,
            BusinessType: typeOfBusiness,
            DateCreated: moment().format("YYYY-MM-DD HH:mm:ss"),
            ProfileImage: profileUrl,
            // InitialAccountSetupPassword: uuid.substring(0, 11),
          });

          setLoginStatus(true);
          setLoginUserDetails({
            AccountId: user.uid,
            CompanyName,
            ContactName,
            Email,
            Location,
            PhoneNumber: `+${phoneNumber}`,
            BusinessType: typeOfBusiness,
            ProfileImage: profileUrl,
            // InitialAccountSetupPassword: uuid.substring(0, 11),
          });

          setSubmitBtnEnabler(false);

          setTypeOfBusiness("");
          reset();
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("errorCode", errorCode, "errorMessage", errorMessage);

          // consitions
          if (errorCode == "auth/email-already-in-use") {
            Swal.fire({
              icon: "warning",
              title: "G-Account Exists",
              text: "Please use a different email",
              customClass: {
                container: "custom-swal-container",
              },
            });

            setSubmitBtnEnabler(false);
          }
        });
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

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div
      id={signupcss.container}
      className="lg:w-[100%]  lg:h-[100vh] lg:flex lg:flex-row 
    sm:w-[100%]  sm:h-[100vh] sm:flex sm:flex-col
    
    md:w-[100%]  md:h-[100vh] md:flex md:flex-row 
    tb:w-[100%]  tb:h-[100vh] tb:flex tb:flex-row 
    "
    >
      <div
        id={signupcss.leftdisplay}
        className="lg:basis-[77%] tb:basis-[77%] tb:block lg:block  sm:hidden md:basis-[77%] md:block"
      >
        {/* <img style={{ width: "100px", position: "absolute",}} src={mailLogo} /> */}
        <div
          style={{
            width: "8vw",
            height: "15vh",
            backgroundImage: `url(${mailLogo})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            // border: "1px solid red",
            position: "absolute",
          }}
        >
          {" "}
        </div>

        <h1
          style={{
            marginTop: "24vh",
            fontSize: "3.8em",
            lineHeight: "1",
            color: "white",
            fontWeight: "500",
            marginBottom: "10vh",
          }}
        >
          {" "}
          IRisk Management Client Relationship Management system{" "}
        </h1>

        <p
          style={{
            width: "40vw",
            fontSize: "1.6em",
            color: "white",
            fontWeight: "400",
          }}
        >
          {" "}
          IRisk CRM .. Designed to reduce busywork-- so you can focus on the
          things that matter.{" "}
        </p>
      </div>
      <div
        id={signupcss.rightdisplay}
        className="lg:basis-[23%] tb:basis-[23%] sm:basis-[100%] md:basis-[23%]"
      >
        <h2> Create Account </h2>
        <div>
          {" "}
          Or{" "}
          <span style={{ color: "blue", cursor: "pointer" }}>
            {" "}
            <Link to="/login"> log in to your account</Link>
          </span>{" "}
        </div>{" "}
        <form onSubmit={handleSubmit(onSubmit)}>
          <ul>
            <li>
              <TextField
                required
                id="outlined-basic"
                className=" lg:w-[17vw] sm:w-[95vw] tb:w-[40vw]"
                label="Company Name"
                variant="outlined"
                // fullWidth={true}
                // sx={{ width: "23vw" }}
                {...register("CompanyName", { required: true })}
              />
            </li>

            <li>
              <TextField
                required
                id="outlined-basic"
                label="ContactName"
                className=" lg:w-[17vw] sm:w-[95vw] tb:w-[40vw]"
                // sx={{ width: "23vw" }}
                variant="outlined"
                // fullWidth={true}
                {...register("ContactName", { required: true })}
              />
            </li>
            <li>
              <TextField
                required
                id="outlined-basic"
                // className="md:w-[10vw] sm:w-[100%]"
                label="Email"
                type="email"
                variant="outlined"
                // fullWidth={true}
                className=" lg:w-[17vw] sm:w-[95vw] tb:w-[40vw]"
                // sx={{ width: "23vw" }}
                {...register("Email", { required: true })}
              />
            </li>
            <li>
              <div className=" lg:w-[17vw] sm:w-[95vw] tb:w-[40vw]">
                <PhoneField
                  defaultValue=""
                  onChange={(e) => {
                    setPhoneNumber(e);
                  }}
                />
              </div>
            </li>
            <li>
              <TextField
                id="outlined-basic"
                label="Location"
                // fullWidth
                className=" lg:w-[17vw] sm:w-[95vw] tb:w-[40vw]"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationCityOutlined />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                // sx={{ width: "23vw" }}
                {...register("Location", { required: true })}
              />
            </li>
            <li>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  className=" lg:w-[17vw] sm:w-[95vw] tb:w-[40vw]"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  {...register("Password", { required: true })}
                />
              </FormControl>
            </li>

            <li>
              <div className=" lg:w-[17vw] sm:w-[95vw] tb:w-[40vw]">
                <BasicSelect
                  label="Type of Business"
                  itemsArray={TypesOfBusinessArray}
                  onChange={(e) => {
                    setTypeOfBusiness(e);
                  }}
                />
              </div>
            </li>
          </ul>
          <Button
            type="submit"
            variant="contained"
            disable={submitBtnEnabler}
            sx={{
              height: 40,
              width: 340,
              display: "flex",
            }}
          >
            Signup
          </Button>
          {submitBtnEnabler === true ? (
            <CircularProgress sx={{ marginLeft: "5vw", marginTop: "1vh" }} />
          ) : (
            ""
          )}
        </form>
      </div>
    </div>
  );
};

export default Signup;

function PhoneField({ defaultCountry, onChange, classes, defaultValue }) {
  // Initialize state to hold the phone number value
  const [phoneNumber, setPhoneNumber] = useState(defaultValue);

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
        fullWidth
        defaultCountry={defaultCountry || "gh"}
        dropdownClass="custom-dropdown-class"
        style={{ width: "100%" }}
      />
    </React.Fragment>
  );
}

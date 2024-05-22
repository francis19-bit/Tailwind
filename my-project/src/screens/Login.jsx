import React, { useEffect, useRef, useState } from "react";
import logincss from "../styles/Login.module.css";
import { Button, CircularProgress, ListItem, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {
  getDocs,
  doc,
  Firestore,
  getDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import mailLogo from "../assets/images/irisklogo.png";
import { useDispatch, useSelector } from "react-redux";
import ForgotPasswordModal from "../components/modals/ForgotPasswordModal";
import { auth, db } from "../Firebase/Firebase";
import Swal from "sweetalert2";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import {
  setLoginStatus,
  setLoginUserDetails,
} from "../statemanager/slices/LoginUserSlice";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [IsLoading, setIsLoading] = useState(false);
  const SweetAlertWarning = (title, message) => {
    Swal.fire({
      icon: "warning",
      title: title,
      text: message,
      customClass: {
        container: "custom-swal-container",
      },
    });
  };

  const handleLogin = async (formData, e) => {
    e.preventDefault();
    try {
      // const {email,password} = formData
      setIsLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      const accountId = user.uid;

      if (user) {
        // dispatch(setLoginStatus(true));
        const userInfoRef = doc(db, `users_db/${accountId}`);
        const userInfoSnap = await getDoc(userInfoRef);

        dispatch(setLoginStatus(true));
        dispatch(setLoginUserDetails(userInfoSnap.data()));
        navigate("/dashboard");
      }
    } catch (error) {
      setIsLoading(false);
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error code:", errorCode);
      // console.error("Error message:", errorMessage);
      switch (errorCode) {
        case "auth/wrong-password":
          SweetAlertWarning(
            "Wrong Password",
            "The password you entered was wrong"
          );
          break;
        case "auth/missing-password":
          SweetAlertWarning("Missing Password", "Please enter a password");
          break;
        case "auth/network=request-failed":
          SweetAlertWarning(
            "Request Failed",
            "Please check your internet connectivity"
          );
          break;
        case "auth/user-not-found":
          SweetAlertWarning("Account doesn't exist", "Account doesn't exist");
          break;
        case "auth/user-disabled":
          SweetAlertWarning(
            "Account disabled",
            "Account has been disabled. Contact support team for help"
          );
          break;
        case "auth/invalid-email":
          SweetAlertWarning("Invalid email", "Please enter an email");
          break;
        case "auth/invalid-credential":
          SweetAlertWarning(
            "Unkown credentials",
            "This account does not exist or your credentials are wrong"
          );
          break;
        default:
      }
    }
  };

  return (
    <div
      id={logincss.container}
      className="lg:w-[100%]  lg:h-[100vh] lg:flex lg:flex-row 
      sm:w-[100%]  sm:h-[100vh] sm:flex sm:flex-col
      
      md:w-[100%]  md:h-[100vh] md:flex md:flex-row 
      tb:w-[100%]  tb:h-[100vh] tb:flex tb:flex-row 
      "
    >
      <div
        id={logincss.leftdisplay}
        className="lg:basis-[77%] tb:basis-[77%] tb:block lg:block  sm:hidden md:basis-[77%] md:block"
      >
        <div
          style={{
            width: "8vw",
            height: "15vh",
            backgroundImage: `url(${mailLogo})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            // border: "1px solid red",
            position: "absolute",
            // background: "red",
          }}
        ></div>

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
        id={logincss.rightdisplay}
        className="lg:basis-[23%] tb:basis-[23%] sm:basis-[100%] md:basis-[23%]"
      >
        <form
          className="sm:p-[5%] lg:p-[0%] tb:p-[0%]"
          onSubmit={handleSubmit(handleLogin)}
        >
          <h2> Sign In </h2>
          <div>
            {" "}
            Or{" "}
            <span style={{ color: "blue", cursor: "pointer" }}>
              {" "}
              <Link to="/signup">create an account</Link>
            </span>{" "}
          </div>{" "}
          <ul>
            <li>
              <TextField
                id="Email"
                label="Email"
                variant="outlined"
                required
                type="email"
                // value={inputID}
                sx={{ width: 340 }}
                onChange={(e) => {
                  // setInputID(e.target.value);
                }}
                {...register("email", { required: true })}
              />
            </li>
            <li>
              {/* <ListItem sx={{ height: 15, marginBottom: 1 }} disablePadding> */}
              <TextField
                id="Password"
                label="Password"
                variant="outlined"
                required
                type="password"
                // value={inputPassword}
                sx={{ width: 340, heigth: 100 }}
                onChange={(e) => {
                  // setInputPassword(e.target.value);
                }}
                {...register("password", { required: true })}
              />
            </li>
          </ul>
          <Button
            variant="contained"
            sx={{ height: 40, width: 340 }}
            // onClick={handleLogin}
            disabled={IsLoading}
            type="submit"
          >
            Login
          </Button>
          {IsLoading === true ? (
            <CircularProgress sx={{ marginLeft: "5vw", marginTop: "1vh" }} />
          ) : (
            ""
          )}
          <br />
          <div style={{ marginTop: "3vh", textAlign: "center" }}>
            <ForgotPasswordModal />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

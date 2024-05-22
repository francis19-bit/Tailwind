import { PhoneInput } from "react-international-phone";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-international-phone/style.css";

const PhoneInputComponent = (phoneNumberValue) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
    phoneNumberValue(value);
    // numberPhone(value);
    // alert(numberPhone(e));
  };
  return (
    <PhoneInput
      required
      style={{
        height: "8.5vh",
        position: "relative",
        width: "14vw",

        // width: "30%",
        // border: "2px solid ",
        borderRadius: "5px",
      }}
      defaultCountry="gh"
      placeholder="Phone Number"
      value={phoneNumber}
      onChange={handlePhoneNumberChange}
    />
  );
};

export default PhoneInputComponent;

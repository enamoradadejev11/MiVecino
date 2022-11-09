import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "wouter";
import { headerAccess, host } from "../../utils/utils";
import Navbar from "../Common/Navbar/Navbar";
import RegisterForm from "./RegisterForm";
import {
  defaultFormErrorVaues,
  defaultFormHelperTextVaues,
  defaultValues,
} from "./registerUtils";

const Register = () => {
  const [, setLocation] = useLocation();
  const [formValues, setFormValues] = useState(defaultValues);
  const [formErrorValues, setFormErrorValues] = useState(defaultFormErrorVaues);
  const [formHelperTextValues, setFormHelperTextValues] = useState(
    defaultFormHelperTextVaues
  );
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });

    if (value === "") {
      setFormErrorValues({
        ...formErrorValues,
        [name]: true,
      });
      setFormHelperTextValues({
        ...formHelperTextValues,
        [name]: "Este campo es obligatorio",
      });
    } else {
      setFormErrorValues({
        ...formErrorValues,
        [name]: false,
      });
      setFormHelperTextValues({
        ...formHelperTextValues,
        [name]: "",
      });
    }
  };

  const handleDatePickerChange = (value) => {
    setFormValues({
      ...formValues,
      birthDate: value,
    });

    if (value === null) {
      setFormErrorValues({
        ...formErrorValues,
        birthDate: true,
      });
      setFormHelperTextValues({
        ...formHelperTextValues,
        birthDate: "Este campo es obligatorio",
      });
    } else {
      setFormErrorValues({
        ...formErrorValues,
        birthDate: false,
      });
      setFormHelperTextValues({
        ...formHelperTextValues,
        birthDate: "",
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${host}/user/register`, formValues)
      .then(function (response) {
        // show successful message
        setLocation("/");
      })
      .catch(function (error) {
        setErrorMessage(error?.response?.data?.message);
      });
  };

  return (
    <>
      <Navbar types={[headerAccess.LOGIN]} />
      <RegisterForm
        formValues={formValues}
        formErrorVaues={formErrorValues}
        formHelperTextValues={formHelperTextValues}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        handleDatePickerChange={handleDatePickerChange}
        errorMessage={errorMessage}
      />
    </>
  );
};

export default Register;

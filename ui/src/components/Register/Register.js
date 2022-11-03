import React, { useState } from "react";
import { useLocation } from "wouter";
import {
  defaultFormErrorVaues,
  defaultFormHelperTextVaues,
  defaultValues,
} from "./registerUtils";
import RegisterForm from "./RegisterForm";
import axios from "axios";
import Navbar from "../Common/Navbar/Navbar";
import { headerAccess, host } from "../../utils/utils";

const Register = () => {
  const [, setLocation] = useLocation();
  const [formValues, setFormValues] = useState(defaultValues);
  const [formErrorValues, setFormErrorValues] = useState(defaultFormErrorVaues);
  const [formHelperTextValues, setFormHelperTextValues] = useState(
    defaultFormHelperTextVaues
  );

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
        // show error message
        console.log(error);
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
      />
    </>
  );
};

export default Register;

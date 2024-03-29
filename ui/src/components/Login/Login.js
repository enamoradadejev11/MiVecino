import React, { useState } from "react";
import { useLocation } from "wouter";
import { getUser } from "../../services/userServices";
import { headerAccess, setUserWithExpiry } from "../../utils/utils";
import Navbar from "../Common/Navbar/Navbar";
import LoginForm from "./LoginForm";
import {
  defaultLoginErrorVaues,
  defaultLoginHelperTextVaues,
  defaultLoginValues,
} from "./loginUtils";

const Login = () => {
  const [, setLocation] = useLocation();
  const [formValues, setFormValues] = useState(defaultLoginValues);
  const [formErrorValues, setFormErrorValues] = useState(
    defaultLoginErrorVaues
  );
  const [formHelperTextValues, setFormHelperTextValues] = useState(
    defaultLoginHelperTextVaues
  );
  const [, setUser] = useState({});

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

  const invalidCredentials = (message) => {
    setFormErrorValues({
      username: true,
      password: true,
    });
    setFormHelperTextValues({
      password: message,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getUser(formValues)
      .then((response) => {
        setUser(response);
        setUserWithExpiry("user", response, 432000000);
        setLocation("/");
      })
      .catch((e) => {
        invalidCredentials(e.response.data?.message);
      });
  };

  return (
    <>
      <Navbar types={[headerAccess.REGISTRO]} />
      <LoginForm
        formValues={formValues}
        formErrorValues={formErrorValues}
        formHelperTextValues={formHelperTextValues}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
      />
    </>
  );
};

export default Login;

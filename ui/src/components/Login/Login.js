import React, { useContext, useState } from "react";
import { getUser } from "../../services/userServices";
import LoginForm from "./LoginForm";
import {
  defaultLoginErrorVaues,
  defaultLoginHelperTextVaues,
  defaultLoginValues,
} from "./loginUtils";
import StaticContext from "../../context/StaticContext";
import { useLocation } from "wouter";
import Navbar from "../Common/Navbar/Navbar";

const Login = () => {
  const context = useContext(StaticContext);
  console.log("context", context);
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
        console.log("res", response);
        setUser(response);
        window.localStorage.setItem("user", JSON.stringify(response));
        setLocation("/");
      })
      .catch((e) => {
        invalidCredentials(e.response.data?.message);
      });
  };

  return (
    <>
    <Navbar type={'registro'}/>
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

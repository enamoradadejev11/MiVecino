import React, { useState } from "react";
import axios from "axios";
import LoginForm from "./LoginForm";
import {
  defaultLoginErrorVaues,
  defaultLoginHelperTextVaues,
  defaultLoginValues,
} from "./loginUtils";

const Login = () => {
  const [formValues, setFormValues] = useState(defaultLoginValues);
  const [formErrorValues, setFormErrorValues] = useState(
    defaultLoginErrorVaues
  );
  const [formHelperTextValues, setFormHelperTextValues] = useState(
    defaultLoginHelperTextVaues
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

  const invalidCredentials = (message) => {
    setFormErrorValues({
      email: true,
      password: true,
    });
    setFormHelperTextValues({
      password: message,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8081/user/login2", formValues)
      .then(function (response) {
        // show successful message
        console.log("res", response);
      })
      .catch(function (error) {
        const { response } = error;
        invalidCredentials(response.data.message);
      });
  };

  return (
    <LoginForm
      formValues={formValues}
      formErrorValues={formErrorValues}
      formHelperTextValues={formHelperTextValues}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};

export default Login;

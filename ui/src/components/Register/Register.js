import React, { useState } from "react";
import {
  defaultFormErrorVaues,
  defaultFormHelperTextVaues,
  defaultValues,
} from "./registerUtils";
import RegisterForm from "./RegisterForm";

const Register = () => {
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
      birthDay: value,
    });

    if (value === null) {
      setFormErrorValues({
        ...formErrorValues,
        birthDay: true,
      });
      setFormHelperTextValues({
        ...formHelperTextValues,
        birthDay: "Este campo es obligatorio",
      });
    } else {
      setFormErrorValues({
        ...formErrorValues,
        birthDay: false,
      });
      setFormHelperTextValues({
        ...formHelperTextValues,
        birthDay: "",
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
  };

  return (
    <>
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

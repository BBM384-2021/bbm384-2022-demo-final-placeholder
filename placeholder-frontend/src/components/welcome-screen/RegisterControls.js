import { useState } from "react";

import { createUser } from "../../services/UserService";

const initialFormValues = {
  full_name: "",
  cs_mail: "",
  user_password: "",
  confirm_password: "",
  user_type: -1,
};

export const useRegisterControls = () => {
  const [values, setValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("full_name" in fieldValues)
      temp.full_name = fieldValues.full_name ? "" : "This field is required.";
    if ("user_type" in fieldValues)
      temp.user_type = fieldValues.user_type ? "" : "This field is required.";

    if ("cs_mail" in fieldValues) {
      temp.cs_mail = fieldValues.cs_mail ? "" : "This field is required.";
      if (fieldValues.email)
        temp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email)
          ? ""
          : "Email is not valid.";
    }

    if ("user_password" in fieldValues)
      temp.user_password =
        fieldValues.user_password.length !== 0 ? "" : "This field is required.";
    if ("confirm_password" in fieldValues)
      temp.confirm_password =
        fieldValues.confirm_password === fieldValues.user_password
          ? ""
          : "Validate your password!";

    setErrors({ ...errors, ...temp });
  };

  const handleInputValue = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    validate({ [name]: value });
    const data = new FormData(e.currentTarget);

    setValues({
      full_name: data.get("full_name"),
      user_type: data.get("user_type") === "student" ? 3 : 4,
      cs_mail: data.get("cs_mail"),
      user_password: data.get("user_password"),
      // student: 3 , graduate: 4
    });
  };

  const handleSuccess = () => {
    setValues({
      ...initialFormValues,
      formSubmitted: true,
      success: true,
    });
  };

  const handleError = () => {
    setValues({
      ...initialFormValues,
      formSubmitted: true,
      success: false,
    });
  };

  const formIsValid = (fieldValues = values) => {
    const isValid =
      fieldValues.full_name &&
      fieldValues.user_type &&
      fieldValues.cs_mail &&
      fieldValues.user_password &&
      Object.values(errors).every((x) => x === "");

    return isValid;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const isValid =
      Object.values(errors).every((x) => x === "") && formIsValid();
    if (isValid) {
      console.log("valid user", values);
      // TODO : build the form and check validation
      // Todo: find a way to handle the request
      //   await createUser(values, handleSuccess, handleError);
    }
  };

  return {
    values,
    errors,
    handleInputValue,
    handleFormSubmit,
    formIsValid,
  };
};

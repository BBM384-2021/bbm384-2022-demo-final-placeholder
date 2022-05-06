import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { TextField, Alert, Box, IconButton, Typography } from "@mui/material";
import { Clear } from "@mui/icons-material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { updateUser } from "../../services/UserService";
import BasicModal from "../commons/BasicModal";

const defaultInputValues = {
  fullName: "",
  phone: "",
  email: "",
  company: "",
  githubLink: "",
  linkedinLink: "",
};

const EditProfileModal = ({ open, setOpen, user, setEdited }) => {
  const [values, setValues] = useState(defaultInputValues);
  const [error, setError] = useState(``);

  const onClose = () => {
    setOpen(false);
  };

  // const removeLink = (link) => {
  //   switch (link) {
  //     case "github":
  //       values.githubLink = "";
  //       setEdited(true);
  //       break;
  //     case "linkedin":
  //       values.linkedinLink = "";
  //       setEdited(true);
  //       break;
  //     default:
  //       break;
  //   }
  // };

  const modalStyles = {
    inputFields: {
      display: "flex",
      flexDirection: "column",
      marginTop: "20px",
      marginBottom: "15px",
      ".MuiFormControl-root": {
        marginBottom: "20px",
      },
    },
  };

  const phoneRegExp =
    /^((\+[1-9]{1,4}[ \-])|(\([0-9]{2,3}\)[ \-])|([0-9]{2,4})[ \-])?[0-9]{3,4}?[ \-][0-9]{3,4}?$/;

  const regMatch =
    /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email is not valid."),
    phone: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
    githubLink: Yup.string().matches(regMatch, "Link is not valid"),
    linkedinLink: Yup.string().matches(regMatch, "Link is not valid"),
  });

  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const validate = () => {
    return true;
  };

  const handleSubmit = () => {
    setError(``);
    if (validate(values)) {
      updateUser({ user: user, values: values })
        .then((response) => {
          console.log(response);
          if (response.data.code === 200) {
            // success
            setOpen(false);
            setEdited(true);
            setError(``);
          } else {
            setError(
              `Please Check Your Data \n [Only use your CS Mail in your profile]`
            );
          }
        })
        .catch((error) => {
          console.log(error.response.request);
        });
    }
  };

  const handleChange = (value) => {
    setValues(value);
  };

  useEffect(() => {
    if (open) setValues(defaultInputValues);
  }, [open]);

  const getContent = () => (
    <Box sx={modalStyles.inputFields}>
      {error && (
        <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        placeholder="FullName"
        name="fullName"
        label="FullName"
        required
        {...register("fullName")}
        error={!!errors.fullName}
        helperText={errors.fullName?.message}
        value={values.fullName}
        onChange={(event) =>
          handleChange({ ...values, fullName: event.target.value })
        }
      />
      <TextField
        placeholder="Phone"
        name="phone"
        label="Phone"
        required
        {...register("phone")}
        error={!!errors.phone}
        helperText={errors.phone?.message}
        value={values.phone}
        onChange={(event) =>
          handleChange({ ...values, phone: event.target.value })
        }
      />
      <TextField
        placeholder="Email"
        name="email"
        label="Email"
        required
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
        value={values.email}
        onChange={(event) =>
          handleChange({ ...values, email: event.target.value })
        }
      />
      <TextField
        placeholder="Company"
        name="company"
        label="Company"
        required
        {...register("company")}
        error={!!errors.company}
        helperText={errors.company?.message}
        value={values.company}
        onChange={(event) =>
          handleChange({ ...values, company: event.target.value })
        }
      />
      <TextField
        placeholder="Github link"
        name="githubLink"
        label="Github Link"
        required
        {...register("githubLink")}
        error={!!errors.githubLink}
        helperText={errors.githubLink?.message}
        value={values.githubLink}
        onChange={(event) =>
          handleChange({ ...values, githubLink: event.target.value })
        }
      />
      {/* TODO LATER: remove the link like below, also style dis */}
      {/* {user.github_url && (
        <div className="">
          <Typography>Current GitHub Link: {user.github_url}</Typography>
          <IconButton
            color="primary"
            aria-label="remove link"
            component="span"
            onClick={() => {
              removeLink("github");
            }}
          >
            <Clear style={{ color: "#FF1F2D" }} fontSize="medium" />
          </IconButton>
        </div>
      )} */}
      <TextField
        placeholder="Linkedin link"
        name="linkedinLink"
        label="Linkedin link"
        required
        {...register("linkedinLink")}
        error={!!errors.linkedinLink}
        helperText={errors.linkedinLink?.message}
        value={values.linkedinLink}
        onChange={(event) =>
          handleChange({ ...values, linkedinLink: event.target.value })
        }
      />
    </Box>
  );

  return (
    <BasicModal
      open={open}
      onClose={onClose}
      title="Edit Profile"
      subTitle="Fill out new info and hit 'submit' button."
      content={getContent()}
      onSubmit={handleSubmit}
    />
  );
};

export default EditProfileModal;

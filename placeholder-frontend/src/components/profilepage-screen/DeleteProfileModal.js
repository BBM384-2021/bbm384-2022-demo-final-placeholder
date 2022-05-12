import React, { useState, useEffect } from "react";
import BasicModal from "../commons/BasicModal";
import {TextField, Box} from "@mui/material";
import {deleteUser} from "../../services/UserService";

const defaultInputValues = {
    csMail: "",
    password: "",
};


const DeleteProfileModal = ({open, setOpen, user}) => {

    const [values, setValues] = useState(defaultInputValues);
    const [error, setError] = useState(``);


    const onClose = () => {
        setOpen(false);
    };
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

    const handleChange = (value) => {
        setValues(value);
    };

    useEffect(() => {
        if (open) setValues(defaultInputValues);
    }, [open]);

    const handleSubmit = () => {
        setError(``);
        deleteUser(user.id, values.csMail, values.password)
            .then(response => {
                console.log(response);
                if(response.data.code === 200){
                    setOpen(false);
                    setError(``);
                    localStorage.setItem("user",null);
                }else{
                    setError(
                        'Please Check Your Data'
                    );
                }
            })
            .catch((error) =>{
                console.log(error.message)
            });
    }

    const getContent = () => (
        <Box sx={modalStyles.inputFields}>
            <TextField
                placeholder="CSMail"
                name="csMail"
                label="csMail"

                value={values.csMail}
                onChange={(event) =>
                    handleChange({ ...values, csMail: event.target.value })
                }
            />
            <TextField
                placeholder="Password"
                name="password"
                label="password"

                value={values.password}
                onChange={(event) =>
                    handleChange({ ...values, password: event.target.value })
                }
            />
        </Box>
    )

    return(
        <BasicModal
            open={open}
            onClose={onClose}
            title="Delete Profile"
            subTitle="Fill out your info and hit 'save' button."
            content={getContent()}
            onSubmit={handleSubmit}
        />
    )
}

export default DeleteProfileModal;
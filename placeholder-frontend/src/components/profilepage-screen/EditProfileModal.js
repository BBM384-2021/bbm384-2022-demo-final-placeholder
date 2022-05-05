import React, { useState, useEffect } from 'react'
import BasicModal from '../commons/BasicModal'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup'
import axios from "axios"

const defaultInputValues = {
    fullName: '',
    phone: '',
    email: '',
    company: '',
    githubLink: '',
    linkedinLink: ''
};

const EditProfileModal = ({ open, onClose, editUserInfo, user, setIsEdit }) => {
    const [values, setValues] = useState(defaultInputValues);

    const modalStyles = {
        inputFields: {
            display: 'flex',
            flexDirection: 'column',
            marginTop: '20px',
            marginBottom: '15px',
            '.MuiFormControl-root': {
                marginBottom: '20px',
            },
        },
    };


    const validationSchema = Yup.object().shape({
        userId: Yup.string()
            .required('User ID is required')
            .min(6, 'User ID must be at least 6 characters'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid.'),
        phoneNumber: Yup.string()

    });

    const {
        register,
        formState: { errors },
    } = useForm({
    });

    const validate = (data) => {
        return true;
    };

    const handleSubmit = () => {
        console.log(user)
        if (validate(values)) {
            axios
                .patch('https://placeholder-backend.herokuapp.com/user/updateUser', {
                    "id":user.id,
                    "full_name":values.fullName,
                    "user_type":user.user_type,
                    "cs_mail":values.email,
                    "phone":values.phone,
                    "company":values.company
                })
                .then((response) => {
                    console.log(response)
                    if (response.data.code === 200) {
                        // success
                        console.log('success');
                        setIsEdit(true);
                    } else {
                    }
                })
                .catch((error) => {
                    console.log(error.response.request);
                });
        }
    }

    const handleChange = (value) => {
        setValues(value)
    };

    useEffect(() => {
        if (open) setValues(defaultInputValues);
    }, [open])

    const getContent = () => (
        <Box sx={modalStyles.inputFields}>
            <TextField
                placeholder="FullName"
                name="fullName"
                label="FullName"
                required
                {...register('fullName')}
                error={!!errors.fullName}
                helperText={errors.fullName?.message}
                value={values.fullName}
                onChange={(event) => handleChange({ ...values, fullName: event.target.value })}
            />
            <TextField
                placeholder="Phone"
                name="phone"
                label="Phone"
                required
                {...register('phone')}
                error={!!errors.phone}
                helperText={errors.phone?.message}
                value={values.phone}
                onChange={(event) => handleChange({ ...values, phone: event.target.value })}
            />
            <TextField
                placeholder="Email"
                name="email"
                label="Email"
                required
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
                value={values.email}
                onChange={(event) => handleChange({ ...values, email: event.target.value })}
            />
            <TextField
                placeholder="Company"
                name="company"
                label="Company"
                required
                {...register('company')}
                error={!!errors.company}
                helperText={errors.company?.message}
                value={values.company}
                onChange={(event) => handleChange({ ...values, company: event.target.value })}
            />
            <TextField
                placeholder="Github link"
                name="githubLink"
                label="Github Link"
                required
                {...register('githubLink')}
                error={!!errors.githubLink}
                helperText={errors.githubLink?.message}
                value={values.githubLink}
                onChange={(event) => handleChange({ ...values, githubLink: event.target.value })}
            />
            <TextField
                placeholder="Linkedin link"
                name="linkedinLink"
                label="Linkedin link"
                required
                {...register('linkedinLink')}
                error={!!errors.linkedinLink}
                helperText={errors.linkedinLink?.message}
                value={values.linkedinLink}
                onChange={(event) => handleChange({ ...values, linkedinLink: event.target.value })}
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

    )
}

export default EditProfileModal
import React, { useState, useEffect } from 'react'
import BasicModal from '../commons/BasicModal'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'

const defaultInputValues = {
    name: '',
    surname: '',
    email: '',
    githubLink: '',
    linkedinLink: ''
};

const EditProfileModal = ({ open, onClose, editUserInfo }) => {
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
        handleSubmit,
        formState: { errors },
    } = useForm({
    });

    const editUser = (data) => {
        editUserInfo(data);
    };

    const handleChange = (value) => {
        setValues(value)
    };

    useEffect(() => {
        if (open) setValues(defaultInputValues);
    }, [open])

    const getContent = () => (
        <Box sx={modalStyles.inputFields}>
            <TextField
                placeholder="Name"
                name="name"
                label="Name"
                required
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
                value={values.name}
                onChange={(event) => handleChange({ ...values, name: event.target.value })}
            />
            <TextField
                placeholder="Surname"
                name="surname"
                label="Surname"
                required
                {...register('surname')}
                error={!!errors.surname}
                helperText={errors.surname?.message}
                value={values.surname}
                onChange={(event) => handleChange({ ...values, surname: event.target.value })}
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
            onSubmit={handleSubmit(editUser)}
        />

    )
}

export default EditProfileModal
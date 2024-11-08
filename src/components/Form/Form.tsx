import React, {useState, ChangeEvent, FormEvent} from 'react';
import {TextField, Button, Box, Typography} from '@mui/material';
import {IUserData} from "../../models/IUser";
import {login, register} from "../../store/actionCreaotors/usesActionCreators";
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../hooks/redux";

interface FormProps {
    isRegisterForm: boolean;
}

interface FormErrors {
    username?: string;
    password?: string;
}

const Form: React.FC<FormProps> = ({ isRegisterForm }) => {
    const [formData, setFormData] = useState<IUserData>({
        username: '',
        password: '',
    });
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [errors, setErrors] = useState<FormErrors>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = (): boolean => {
        const tempErrors: FormErrors = {};
        if (!formData.username) tempErrors.username = "Username is required";
        if (!formData.password) tempErrors.password = "Password is required";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            if (isRegisterForm) {
                await dispatch(register(formData));
            }
            await dispatch(login(formData));
            navigate('/home');
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                maxWidth: 400,
                margin: 'auto',
                marginTop: '100px',
                p: 3,
                borderRadius: 2,
                boxShadow: 3,
            }}
        >
            <Typography variant="h4" align="center" gutterBottom>
                {isRegisterForm ? 'Register' : 'Login'}
            </Typography>

            <TextField
                label="Username"
                variant="outlined"
                name="username"
                value={formData.username}
                onChange={handleChange}
                error={!!errors.username}
                helperText={errors.username}
                fullWidth
            />

            <TextField
                label="Password"
                variant="outlined"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                fullWidth
            />

            <Button type="submit" variant="contained" color="primary" fullWidth>
                {isRegisterForm ? 'Register' : 'Login'}
            </Button>
            <Box>
                <Typography>
                    {isRegisterForm ? "You already have an account?" : "You don't have any account?"}
                </Typography>
                <Link to={isRegisterForm ? '/login' : '/register'}>
                    {isRegisterForm ? 'Please Login' : 'Please Register'}
                </Link>
            </Box>
        </Box>
    );
};

export default Form;

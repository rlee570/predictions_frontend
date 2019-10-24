import React from 'react';
import Typography from '@material-ui/core/Typography';
import {Container, CssBaseline, Grid, TextField} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {userService} from "../services/UserService";
import {Formik, FormikActions, FormikProps} from "formik";
import * as Yup from "yup";
import Snackbar from '@material-ui/core/Snackbar';
import {RouteComponentProps} from 'react-router-dom';
import {StyledAvatar, StyledButton, StyledDiv, StyledForm, StyledSnackbarContent} from "./styles/FormStyles";

export interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

interface SignUpProps extends RouteComponentProps<any> {
}

export default function SignUp(props: SignUpProps) {
    const {history} = props;
    const [openSnackbar, setOpenSnackbar] = React.useState<boolean>(false);

    const handleSubmit = (values: UserData, actions: FormikActions<UserData>) => {
        //TODO integrate with backend
        const user = userService.createUser(values);
        if (user) {
            history.push('/dashboard/');
        } else {
            setOpenSnackbar(true);
        }
        actions.setSubmitting(false);
    };

    const signupValidation = () => {
        return (
        Yup.object().shape({
            firstName: Yup.string()
                .required('Required'),
            lastName: Yup.string()
                .required('Required'),
            email: Yup.string()
               .email()
               .required('Required'),
            password: Yup.string()
                .required('Required')
                .min(8, 'Password should be at least 8 characters.'),
        }));
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <StyledDiv>
                <StyledAvatar>
                    <LockOutlinedIcon/>
                </StyledAvatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <Snackbar
                    open={openSnackbar}
                    onClose={() => setOpenSnackbar(false)}
                    anchorOrigin={{vertical: 'top', horizontal: 'center',}}
                >
                    <StyledSnackbarContent
                        message={<span id="client-snackbar">This email address is already registered.</span>}
                    />
                </Snackbar>
                <Formik
                    initialValues={{firstName: '', lastName: '', email: '', password: ''}}
                    onSubmit={handleSubmit}
                    validationSchema={signupValidation()}
                    render={(formikBag: FormikProps<UserData>) => (
                        <StyledForm onSubmit={formikBag.handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="fname"
                                        name="firstName"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        value={formikBag.values.firstName}
                                        onChange={formikBag.handleChange}
                                        onBlur={formikBag.handleBlur}
                                        helperText={(formikBag.errors.firstName && formikBag.touched.firstName) && formikBag.errors.firstName}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="lname"
                                        value={formikBag.values.lastName}
                                        onChange={formikBag.handleChange}
                                        onBlur={formikBag.handleBlur}
                                        helperText={(formikBag.errors.lastName && formikBag.touched.lastName) && formikBag.errors.lastName}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        value={formikBag.values.email}
                                        onChange={formikBag.handleChange}
                                        onBlur={formikBag.handleBlur}
                                        helperText={(formikBag.errors.email && formikBag.touched.email) && formikBag.errors.email}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        value={formikBag.values.password}
                                        onChange={formikBag.handleChange}
                                        onBlur={formikBag.handleBlur}
                                        helperText={(formikBag.errors.password && formikBag.touched.password) && formikBag.errors.password}
                                    />
                                </Grid>
                            </Grid>
                            <StyledButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                disabled={formikBag.isSubmitting}
                            >
                                Sign Up
                            </StyledButton>
                        </StyledForm>
                    )}
                />
            </StyledDiv>
        </Container>
    );
}










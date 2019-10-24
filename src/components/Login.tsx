import React, {useContext} from 'react';
import Typography from '@material-ui/core/Typography';
import {Container, CssBaseline, TextField} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {userService} from "../services/UserService";
import {Redirect, RouteComponentProps} from 'react-router-dom';
import {Formik, FormikActions, FormikProps} from "formik";
import * as Yup from "yup";
import Snackbar from '@material-ui/core/Snackbar';
import {StateContext} from "../state/StateProvider";
import {ActionType} from "../state/Authentication";
import {StyledAvatar, StyledButton, StyledDiv, StyledForm, StyledSnackbarContent} from "./styles/FormStyles";

interface LoginData {
    email: string;
    password: string;
}

interface LoginProps extends RouteComponentProps<any> {
}

export default function Login(props: LoginProps) {
    const {history} = props;
    const [openSnackbar, setOpenSnackbar] = React.useState<boolean>(false);
    const [authenticationState, dispatch] = useContext(StateContext);

    const handleSubmit = (values: LoginData, actions: FormikActions<LoginData>) => {
            //TODO integrate with backend
            dispatch({type: ActionType.LOGIN_REQUEST});
            const p = new Promise(function (resolve, reject) {
                    const authenticationResponse = userService.login(values.email, values.password);
                    if (authenticationResponse.token) {
                        resolve(authenticationResponse);
                    } else {
                        const error = "error during login";
                        reject(error);
                    }
                }
            );
            p.then(
                authenticationResponse => {
                    dispatch({type: ActionType.LOGIN_SUCCESS, response: authenticationResponse});
                    history.push('/dashboard/');
                },
                error => {
                    dispatch({type: ActionType.LOGIN_FAILURE, error});
                    setOpenSnackbar(true);
                }
            );

            actions.setSubmitting(false);
        }
    ;

    const loginValidation = () => {
        return (
            Yup.object().shape({
                email: Yup.string()
                //.email()
                    .required('Required'),
                password: Yup.string()
                    .required('Required'),
            }));
    };

    // redirect to dashboard if user is already logged in
    if (userService.isAuthenticated(authenticationState)) {
        return <Redirect to="/dashboard/"/>;
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <StyledDiv>
                <StyledAvatar>
                    <LockOutlinedIcon/>
                </StyledAvatar>
                <Typography component="h1" variant="h5">
                    Log in
                </Typography>
                <Snackbar
                    open={openSnackbar}
                    onClose={() => setOpenSnackbar(false)}
                    anchorOrigin={{vertical: 'top', horizontal: 'center',}}
                >
                    <StyledSnackbarContent
                        message={<span id="client-snackbar">Please enter the correct login or password.</span>}
                    />
                </Snackbar>
                <Formik
                    initialValues={{email: '', password: ''}}
                    onSubmit={handleSubmit}
                    validationSchema={loginValidation}
                    render={(formikBag: FormikProps<LoginData>) => (
                        <StyledForm onSubmit={formikBag.handleSubmit}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={formikBag.values.email}
                                onChange={formikBag.handleChange}
                                onBlur={formikBag.handleBlur}
                                helperText={(formikBag.errors.email && formikBag.touched.email) && formikBag.errors.email}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={formikBag.values.password}
                                onChange={formikBag.handleChange}
                                helperText={(formikBag.errors.password && formikBag.touched.password) && formikBag.errors.password}
                            />
                            <StyledButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                disabled={formikBag.isSubmitting}
                            >
                                Log In
                            </StyledButton>
                        </StyledForm>
                    )}
                />
            </StyledDiv>
        </Container>
    );
}










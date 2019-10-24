import React, {useContext} from 'react';
import Typography from '@material-ui/core/Typography';
import {Container, CssBaseline} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {userService} from "../services/UserService";
import {Redirect, RouteComponentProps} from 'react-router-dom';
import {Formik, FormikActions, FormikProps} from "formik";
import * as Yup from "yup";
import Snackbar from '@material-ui/core/Snackbar';
import {StateContext} from "../state/StateProvider";
import {ActionType} from "../state/Authentication";
import {StyledAvatar, StyledDiv, StyledSnackbarContent} from "./styles/FormStyles";
import LoginForm, {initialLoginData, LoginData} from "./LoginForm";

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
                    initialValues={initialLoginData}
                    onSubmit={handleSubmit}
                    validationSchema={loginValidation}
                    render={(formikBag: FormikProps<LoginData>) => (
                        <LoginForm formikBagProps={formikBag} />
                    )}
                />
            </StyledDiv>
        </Container>
    );
}










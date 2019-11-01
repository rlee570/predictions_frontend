import React, {useContext} from 'react';
import Typography from '@material-ui/core/Typography';
import {CircularProgress, Container, CssBaseline} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {Redirect, RouteComponentProps} from 'react-router-dom';
import {Formik, FormikActions, FormikProps} from "formik";
import * as Yup from "yup";
import {StateContext} from "../state/StateProvider";
import LoginForm, {LoginData} from "./LoginForm";
import {userApi} from "../services/Api";
import {AxiosError, AxiosResponse} from "axios";
import {AuthenticationActionType} from "../state/user/Action";
import {AuthenticationResponse, isAuthenticated} from "../state/user/Authentication";
import CustomSnackbar from "./CustomSnackbar";
import {StyledAvatar, StyledDiv} from "./styles/MuiStyles";

interface LoginProps extends RouteComponentProps<any> {
}

export default function Login(props: LoginProps) {
    const {history} = props;

    const [authenticationState, dispatch] = useContext(StateContext);
    const [openSnackbar, setOpenSnackbar] = React.useState<boolean>(false);

    const initLoginData = () => {
        let initialEmail = '';
        if (authenticationState.user && authenticationState.user.email) {
            initialEmail = authenticationState.user.email;
        }
        const initialLoginData: LoginData = {email: initialEmail, password: '' };
        return initialLoginData;
    };

    const handleSubmit = (values: LoginData, actions: FormikActions<LoginData>) => {

        dispatch({type: AuthenticationActionType.LOGIN_REQUEST});
        userApi.login(values.email, values.password)
            .then((response: AxiosResponse<AuthenticationResponse>) => {
                dispatch({type: AuthenticationActionType.LOGIN_SUCCESS, response: response.data});
                history.push('/dashboard/');
            })
            .catch((error: AxiosError) => {
                dispatch({type: AuthenticationActionType.LOGIN_FAILURE, errorResponse: error});
                setOpenSnackbar(true);
            });
        actions.setSubmitting(false);
    };

    const loginValidation = () => {
        return (
            Yup.object().shape({
                email: Yup.string()
                .email()
                    .required('Required'),
                password: Yup.string()
                    .required('Required'),
            }));
    };

    // redirect to dashboard if user is already logged in
    if (isAuthenticated(authenticationState)) {
        return <Redirect to="/dashboard/"/>;
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <StyledDiv>
                {authenticationState.isLoading && <CircularProgress/>}
                <StyledAvatar>
                    <LockOutlinedIcon/>
                </StyledAvatar>
                <Typography component="h1" variant="h5">
                    Log in
                </Typography>

                <CustomSnackbar snackbarMessage={authenticationState.error} openBar={openSnackbar}
                                onClose={() => setOpenSnackbar(false)}
                                variant={authenticationState.error ? 'error' : 'success'}/>

                <Formik
                    initialValues={initLoginData()}
                    onSubmit={handleSubmit}
                    validationSchema={loginValidation}
                    render={(formikBag: FormikProps<LoginData>) => (
                        <LoginForm formikBagProps={formikBag}/>
                    )}
                />
            </StyledDiv>
        </Container>
    );
}










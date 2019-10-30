import React, {useContext} from 'react';
import Typography from '@material-ui/core/Typography';
import {CircularProgress, Container, CssBaseline} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {Redirect, RouteComponentProps} from 'react-router-dom';
import {Formik, FormikActions, FormikProps} from "formik";
import * as Yup from "yup";
import Snackbar from '@material-ui/core/Snackbar';
import {StateContext} from "../state/StateProvider";
import {StyledAvatar, StyledDiv, StyledSnackbarContent} from "./styles/FormStyles";
import LoginForm, {initialLoginData, LoginData} from "./LoginForm";
import {userApi} from "../services/Api";
import {AxiosError, AxiosResponse} from "axios";
import {ActionType} from "../state/user/Action";
import {AuthenticationResponse, isAuthenticated} from "../state/user/Authentication";

interface LoginProps extends RouteComponentProps<any> {
}


export default function Login(props: LoginProps) {
    const {history} = props;
    const [openSnackbar, setOpenSnackbar] = React.useState<boolean>(false);
    const [errorMsg, setErrorMsg] = React.useState<string>("");
    const [authenticationState, dispatch] = useContext(StateContext);

    const handleSubmit = (values: LoginData, actions: FormikActions<LoginData>) => {

        dispatch({type: ActionType.LOGIN_REQUEST});
        userApi.login(values.email, values.password)
            .then((response: AxiosResponse<AuthenticationResponse>) => {
                dispatch({type: ActionType.LOGIN_SUCCESS, response: response.data});
                history.push('/dashboard/');
            })
            .catch((error: AxiosError) => {
                dispatch({type: ActionType.LOGIN_FAILURE,});
                // TODO handle functional and technical errors from backend once available
                if (error.isAxiosError) {
                    setErrorMsg(error.message);
                } else {
                    setErrorMsg("Please enter the correct login or password.");
                }
                setOpenSnackbar(true);
            });
        actions.setSubmitting(false);
    };

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
    if (isAuthenticated(authenticationState)) {
        return <Redirect to="/dashboard/"/>;
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <StyledDiv>
                {authenticationState.isLoading && <CircularProgress/> }
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
                        message={<span id="client-snackbar">{errorMsg}</span>}
                    />
                </Snackbar>


                <Formik
                    initialValues={initialLoginData}
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










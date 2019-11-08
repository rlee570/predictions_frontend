import React, {useContext} from 'react';
import Typography from '@material-ui/core/Typography';
import {CircularProgress, Container, CssBaseline} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {Redirect, RouteComponentProps} from 'react-router-dom';
import {Formik, FormikActions, FormikProps} from "formik";
import * as Yup from "yup";
import {StateContext} from "../state/StateProvider";
import LoginForm, {LoginData} from "./LoginForm";
import {userApi} from "../service/Api";
import {AxiosError, AxiosResponse} from "axios";
import {UserActionType} from "../state/user/Action";
import {isAuthenticated} from "../state/user/User";
import CustomSnackbar from "./CustomSnackbar";
import {StyledAvatar, StyledDiv} from "./styles/MuiStyles";
import {UserResponse} from "../service/Response";

interface LoginProps extends RouteComponentProps<any> {
}

export default function Login(props: LoginProps) {
    const {history} = props;

    const [userState, dispatch] = useContext(StateContext);
    const [openSnackbar, setOpenSnackbar] = React.useState<boolean>(false);

    const initLoginData = () => {
        let initialEmail = '';
        if (userState.user && userState.user.email) {
            initialEmail = userState.user.email;
        }
        const initialLoginData: LoginData = {email: initialEmail, password: '' };
        return initialLoginData;
    };

    const handleSubmit = (values: LoginData, actions: FormikActions<LoginData>) => {
        dispatch({type: UserActionType.LOGIN_REQUEST});
        userApi.login(values.email, values.password)
            .then((response: AxiosResponse<UserResponse>) => {
                dispatch({type: UserActionType.LOGIN_SUCCESS, response: response.data});
                history.push('/dashboard/');
            })
            .catch((error: AxiosError) => {
                dispatch({type: UserActionType.LOGIN_FAILURE, errorResponse: error});
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
    if (isAuthenticated(userState)) {
        return <Redirect to="/dashboard/"/>;
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <StyledDiv>
                {userState.isLoading && <CircularProgress/>}
                <StyledAvatar>
                    <LockOutlinedIcon/>
                </StyledAvatar>
                <Typography component="h1" variant="h5">
                    Log in
                </Typography>

                <CustomSnackbar snackbarMessage={userState.error} openBar={openSnackbar}
                                onClose={() => setOpenSnackbar(false)}
                                variant={userState.error ? 'error' : 'success'}/>

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










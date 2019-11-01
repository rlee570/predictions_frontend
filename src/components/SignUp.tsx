import React, {useContext} from 'react';
import Typography from '@material-ui/core/Typography';
import {CircularProgress, Container, CssBaseline} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {Formik, FormikActions, FormikProps} from "formik";
import * as Yup from "yup";
import {RouteComponentProps} from 'react-router-dom';
import SignUpForm, {SignUpData} from "./SignUpForm";
import {AuthenticationActionType} from "../state/user/Action";
import {userApi} from "../services/Api";
import {AxiosError, AxiosResponse} from "axios";
import {User, UserResponse} from "../state/user/Authentication";
import {StateContext} from "../state/StateProvider";
import CustomSnackbar from "./CustomSnackbar";
import {StyledAvatar, StyledDiv} from "./styles/MuiStyles";

interface SignUpProps extends RouteComponentProps<any> {
}

export default function SignUp(props: SignUpProps) {
    const {history} = props;

    const initialSignUpData: SignUpData = {firstName: '', lastName: '', email: '', password: ''};

    const [authenticationState, dispatch] = useContext(StateContext);

    const [openSnackbar, setOpenSnackbar] = React.useState<boolean>(false);

    const handleSubmit = (values: SignUpData, actions: FormikActions<SignUpData>) => {
        dispatch({type: AuthenticationActionType.CREATE_USER_REQUEST});
        const newUser = new User(values.firstName, values.lastName, values.email, values.password);
        userApi.createUser(newUser)
            .then((response: AxiosResponse<UserResponse>) => {
                dispatch({type: AuthenticationActionType.CREATE_USER_SUCCESS, response: response.data});
                history.push('/login/');
            })
            .catch((error: AxiosError) => {
                dispatch({type: AuthenticationActionType.CREATE_USER_FAILURE, errorResponse: error});
                setOpenSnackbar(true);
            });
        actions.setSubmitting(false);
    };

    const signupValidation = () => {
        const minNoChars: number = 8;
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
                    .min(minNoChars, 'Password should be at least ' + minNoChars + ' characters.'),
            }));
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <StyledDiv>
                {authenticationState.isLoading && <CircularProgress/>}

                <StyledAvatar>
                    <LockOutlinedIcon/>
                </StyledAvatar>

                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>

                <CustomSnackbar snackbarMessage={authenticationState.error} openBar={openSnackbar}
                                onClose={() => setOpenSnackbar(false)}
                                variant={authenticationState.error ? 'error' : 'success'}/>

                <Formik
                    initialValues={initialSignUpData}
                    onSubmit={handleSubmit}
                    validationSchema={signupValidation()}
                    render={(formikBag: FormikProps<SignUpData>) => (
                        <SignUpForm formikBagProps={formikBag}/>
                    )}
                />
            </StyledDiv>
        </Container>
    );
}










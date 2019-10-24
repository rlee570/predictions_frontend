import React from 'react';
import Typography from '@material-ui/core/Typography';
import {Container, CssBaseline} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {userService} from "../services/UserService";
import {Formik, FormikActions, FormikProps} from "formik";
import * as Yup from "yup";
import Snackbar from '@material-ui/core/Snackbar';
import {RouteComponentProps} from 'react-router-dom';
import {StyledAvatar, StyledDiv, StyledSnackbarContent} from "./styles/FormStyles";
import SignUpForm, {initialSignUpData, SignUpData} from "./SignUpForm";

interface SignUpProps extends RouteComponentProps<any> {
}

export default function SignUp(props: SignUpProps) {
    const {history} = props;
    const [openSnackbar, setOpenSnackbar] = React.useState<boolean>(false);

    const handleSubmit = (values: SignUpData, actions: FormikActions<SignUpData>) => {
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










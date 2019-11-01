import {FormikProps} from "formik";
import {Grid, TextField} from "@material-ui/core";
import React from "react";
import {StyledButton, StyledForm} from "./styles/MuiStyles";

export interface SignUpData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

interface SignUpFormProps {
    formikBagProps: FormikProps<SignUpData>;
}

export default function SignUpForm(props: SignUpFormProps) {
    const {formikBagProps} = props;

    return (
        <StyledForm onSubmit={formikBagProps.handleSubmit} id={"signup-form"}>
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
                        value={formikBagProps.values.firstName}
                        onChange={formikBagProps.handleChange}
                        onBlur={formikBagProps.handleBlur}
                        helperText={(formikBagProps.errors.firstName && formikBagProps.touched.firstName) && formikBagProps.errors.firstName}
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
                        value={formikBagProps.values.lastName}
                        onChange={formikBagProps.handleChange}
                        onBlur={formikBagProps.handleBlur}
                        helperText={(formikBagProps.errors.lastName && formikBagProps.touched.lastName) && formikBagProps.errors.lastName}
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
                        value={formikBagProps.values.email}
                        onChange={formikBagProps.handleChange}
                        onBlur={formikBagProps.handleBlur}
                        helperText={(formikBagProps.errors.email && formikBagProps.touched.email) && formikBagProps.errors.email}
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
                        value={formikBagProps.values.password}
                        onChange={formikBagProps.handleChange}
                        onBlur={formikBagProps.handleBlur}
                        helperText={(formikBagProps.errors.password && formikBagProps.touched.password) && formikBagProps.errors.password}
                    />
                </Grid>
            </Grid>
            <StyledButton
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={formikBagProps.isSubmitting}
            >
                Sign Up
            </StyledButton>
        </StyledForm>
    );
}


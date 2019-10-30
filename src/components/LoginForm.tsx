import {FormikProps} from "formik";
import {TextField} from "@material-ui/core";
import {StyledButton, StyledForm} from "./styles/FormStyles";
import React from "react";

export interface LoginData {
    email: string;
    password: string;
}

export const initialLoginData: LoginData = {email: "", password: ""};

interface LoginFormProps {
    formikBagProps: FormikProps<LoginData>;
}

export default function LoginForm(props: LoginFormProps) {
    const {formikBagProps} = props;

    return (
        <StyledForm onSubmit={formikBagProps.handleSubmit} id={"login-form"}>
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
                value={formikBagProps.values.email}
                onChange={formikBagProps.handleChange}
                onBlur={formikBagProps.handleBlur}
                helperText={(formikBagProps.errors.email && formikBagProps.touched.email) && formikBagProps.errors.email}
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
                value={formikBagProps.values.password}
                onChange={formikBagProps.handleChange}
                helperText={(formikBagProps.errors.password && formikBagProps.touched.password) && formikBagProps.errors.password}
            />
            <StyledButton
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={formikBagProps.isSubmitting}
            >
                Log In
            </StyledButton>
        </StyledForm>
    );
}
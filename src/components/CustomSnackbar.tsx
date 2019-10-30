import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import {makeStyles, SnackbarContent, Theme} from "@material-ui/core";
import {green} from "@material-ui/core/colors";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) => ({
    success: {
        backgroundColor: green[600],
        margin: theme.spacing(7)
    },
    error: {
        backgroundColor: theme.palette.error.dark,
        margin: theme.spacing(7)
    },
}))

const barVariant = {
    success: 'success',
    error: 'error',
};

export interface Props {
    snackbarMessage: string;
    onClose: () => void;
    openBar: boolean;
    variant: keyof typeof barVariant;
}

export default function CustomSnackbar(props: Props) {
    const classes = useStyles();
    const {snackbarMessage, onClose, openBar, variant} = props;

    return (
        <>
            <Snackbar
                open={openBar}
                onClose={onClose}
                anchorOrigin={{vertical: 'top', horizontal: 'center',}}
            >
                <SnackbarContent
                    message={<span>{snackbarMessage}</span>}
                    className={clsx(classes[variant])}
                />
            </Snackbar>
        </>
    );
}
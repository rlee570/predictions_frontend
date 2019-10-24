import {createStyles, Theme} from "@material-ui/core";
import red from "@material-ui/core/colors/red";

const CommonStyles = (theme: Theme) =>
    createStyles({
        '@global': {
            body: {
                backgroundColor: theme.palette.common.white,
            },
        },
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(3),
            backgroundColor: theme.palette.common.black,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
        snackbarContent: {
            margin: theme.spacing(7),
            backgroundColor: red[500],
        },
        link: {
            margin: theme.spacing(1),
        },
    });


export default CommonStyles;
import {Avatar, Button, SnackbarContent, styled} from "@material-ui/core";
import red from "@material-ui/core/colors/red";

export const StyledDiv = styled('div')(({theme}) => ({
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}));

export const StyledAvatar = styled(Avatar)(({theme}) => ({
    margin: theme.spacing(3),
    backgroundColor: theme.palette.common.black,
})) as typeof Avatar;

export const StyledSnackbarContent = styled(SnackbarContent)(({theme}) => ({
    margin: theme.spacing(7),
    backgroundColor: red[500],
})) as typeof SnackbarContent;

export const StyledForm = styled('form')(({theme}) => ({
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
}));

export const StyledButton = styled(Button)(({theme}) => ({
    margin: theme.spacing(3, 0, 2),
})) as typeof Button;
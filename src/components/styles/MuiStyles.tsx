import {Avatar, Button, styled} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

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

export const StyledForm = styled('form')(({theme}) => ({
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
}));

export const StyledButton = styled(Button)(({theme}) => ({
    margin: theme.spacing(3, 0, 2),
})) as typeof Button;

export const StyledPaper = styled(Paper)(({theme}) => ({
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
})) as typeof Paper;

export const StyledTypography = styled(Typography)({
    flexGrow: 1,
}) as typeof Typography;
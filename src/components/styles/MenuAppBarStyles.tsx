import {styled} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

export const StyledDiv = styled('div')(({theme}) => ({
    padding: theme.spacing(1),
    flexGrow: 1,
}));

export const StyledTypography = styled(Typography)({
    flexGrow: 1,
}) as typeof Typography;
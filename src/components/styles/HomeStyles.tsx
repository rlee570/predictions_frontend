import {styled} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

export const StyledPaper = styled(Paper)(({theme}) => ({
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
})) as typeof Paper;
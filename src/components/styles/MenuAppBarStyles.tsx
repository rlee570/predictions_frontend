import {createStyles, Theme} from "@material-ui/core";

const MenuAppBarStyles = (theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(4),
        },
        link: {
            margin: theme.spacing(4),
        },
        title: {
            flexGrow: 1,
        },
    });


export default MenuAppBarStyles;
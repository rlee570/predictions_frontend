import React, {useContext} from 'react';
import {withStyles, WithStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuAppBarStyles from "./styles/MenuAppBarStyles";
import {Button} from "@material-ui/core";
import {userService} from "../services/UserService";
import {History} from "history";
import {Link} from 'react-router-dom'
import {StateContext} from "../state/StateProvider";
import {ActionType} from "../state/Authentication";

interface MenuAppBarProps extends WithStyles<typeof MenuAppBarStyles> {
    history: History;
}

function MenuAppBar(props: MenuAppBarProps) {
    const {classes, history} = props;
    const [authenticationState, dispatch] = useContext(StateContext);

    const handleLogout = () => {
        dispatch({type: ActionType.LOGOUT_REQUEST});
        dispatch({type: ActionType.LOGOUT_SUCCESS});
        history.push("/");
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Prediction Platform
                    </Typography>

                    {!userService.isAuthenticated(authenticationState) &&
                    <Button component={Link} to="/signup" color="inherit">Sign up</Button>
                    }

                    {!userService.isAuthenticated(authenticationState) &&
                    <Button component={Link} to="/login" color="inherit">Log in</Button>
                    }

                    {userService.isAuthenticated(authenticationState) &&
                    <Button color="inherit" onClick={handleLogout}>Log out</Button>
                    }

                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withStyles(MenuAppBarStyles)(MenuAppBar);

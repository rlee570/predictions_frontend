import React, {useContext} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import {History} from "history";
import {Link} from 'react-router-dom'
import {StateContext} from "../state/StateProvider";
import {StyledDiv} from "./styles/MenuAppBarStyles";
import {UserActionType} from "../state/user/Action";
import {isAuthenticated, removeToken} from "../state/user/User";
import {StyledTypography} from "./styles/MuiStyles";
import {Tooltip} from "@material-ui/core";
import LockIcon from '@material-ui/icons/Lock';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


interface MenuAppBarProps {
    history: History;
}

export function MenuAppBar(props: MenuAppBarProps) {
    const {history} = props;
    const [userState, dispatch] = useContext(StateContext);

    const handleLogout = () => {
        dispatch({type: UserActionType.LOGOUT_REQUEST});
        const logoutPromise = new Promise((resolve) => {
            removeToken();
            resolve();
        });
        logoutPromise.then(() => {
            dispatch({type: UserActionType.LOGOUT_SUCCESS});
            history.push("/");
        });
    };

    return (
        <StyledDiv>
            <AppBar position="static">
                <Toolbar>
                    <Tooltip title="Home" aria-label="menu-home-tooltip">
                        <IconButton edge="start" color="inherit" aria-label="menu-home" component={Link} to="/">
                            <HomeIcon/>
                        </IconButton>
                    </Tooltip>

                    {isAuthenticated(userState) &&
                    <Tooltip title="Dashboard" aria-label="menu-dashboard-tooltip">
                        <IconButton edge="start" color="inherit" aria-label="menu-dashboard" component={Link}
                                    to="/dashboard">
                            <DashboardIcon/>
                        </IconButton>
                    </Tooltip>
                    }

                    <StyledTypography variant="h6" align={"left"}>
                        Prediction Platform
                    </StyledTypography>

                    {!isAuthenticated(userState) &&
                    <Tooltip title="Sign up" aria-label="menu-signup-tooltip">
                        <IconButton edge="end" color="inherit" aria-label="menu-signup" component={Link}
                                    to="/signup">
                            <AccountBoxIcon/>
                        </IconButton>
                    </Tooltip>
                    }

                    {!isAuthenticated(userState) &&
                    <Tooltip title="Log in" aria-label="menu-login-tooltip">
                        <IconButton edge="end" color="inherit" aria-label="menu-login" component={Link}
                                    to="/login">
                            <LockIcon/>
                        </IconButton>
                    </Tooltip>
                    }

                    {isAuthenticated(userState) &&
                    <StyledTypography variant="button" align="right">
                        {userState.user && userState.user.firstName} {userState.user && userState.user.lastName}
                    </StyledTypography>
                    }

                    {isAuthenticated(userState) &&
                    < Tooltip title="Log out" aria-label="menu-logout-tooltip">
                        <IconButton edge="end" color="inherit" aria-label="menu-logout" onClick={handleLogout}>
                            <ExitToAppIcon/>
                        </IconButton>
                    </Tooltip>
                    }

                </Toolbar>
            </AppBar>
        </StyledDiv>
    );
}

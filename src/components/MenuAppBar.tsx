import React, {useContext} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {History} from "history";
import {Link} from 'react-router-dom'
import {StateContext} from "../state/StateProvider";
import Button from '@material-ui/core/Button';
import {StyledDiv, StyledTypography} from "./styles/MenuAppBarStyles";
import {ActionType} from "../state/user/Action";
import {isAuthenticated} from "../state/user/Authentication";

interface MenuAppBarProps {
    history: History;
}

export function MenuAppBar(props: MenuAppBarProps) {
    const {history} = props;
    const [authenticationState, dispatch] = useContext(StateContext);

    const handleLogout = () => {
        dispatch({type: ActionType.LOGOUT_REQUEST});
        dispatch({type: ActionType.LOGOUT_SUCCESS});
        history.push("/");
    };

    return (
        <StyledDiv>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <StyledTypography variant="h6">
                        Prediction Platform
                    </StyledTypography>

                    {!isAuthenticated(authenticationState) &&
                    <Button component={Link} to="/signup" color="inherit">Sign up</Button>
                    }

                    {!isAuthenticated(authenticationState) &&
                    <Button component={Link} to="/login" color="inherit">Log in</Button>
                    }

                    {isAuthenticated(authenticationState) &&
                    <Button color="inherit" onClick={handleLogout}>Log out</Button>
                    }
                </Toolbar>
            </AppBar>
        </StyledDiv>
    );
}

import React from 'react';
import './App.css';

import {createBrowserHistory} from 'history';
import {PrivateRoute} from "./routes/PrivateRoute";
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import Home from "./components/Home";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import SignUp from "./components/SignUp";
import {MuiThemeProvider} from "@material-ui/core";
import {customTheme} from "./components/styles/CustomTheme";
import {StateProvider} from './state/StateProvider';
import {MenuAppBar} from "./components/MenuAppBar";
import {userReducer} from "./state/user/Reducer";
import {initialUserState} from "./state/user/User";
import SetupUser from "./components/SetupUser";

export const history = createBrowserHistory();

const App: React.FC = () => {

    return (
        <div className="App">
            <BrowserRouter>
                <MuiThemeProvider theme={customTheme}>
                    <StateProvider initialState={initialUserState()} reducer={userReducer}>
                        <SetupUser />
                        <MenuAppBar history={history}/>
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/signup" component={SignUp}/>
                            <Redirect from="*" to="/"/>
                        </Switch>
                    </StateProvider>
                </MuiThemeProvider>
            </BrowserRouter>
        </div>
    );
};

export default App;

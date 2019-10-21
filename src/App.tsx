import React from 'react';
import './App.css';

import {createBrowserHistory} from 'history';
import {PrivateRoute} from "./routes/PrivateRoute";
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import HomePage from "./components/Home";
import Login from "./components/Login";
import MyHomePage from "./components/MyHome";
import SignUp from "./components/SignUp";
import {MuiThemeProvider} from "@material-ui/core";
import {customTheme} from "./components/styles/CustomTheme";
import MenuAppBar from "./components/MenuAppBar";


export const history = createBrowserHistory();

const App: React.FC = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <MuiThemeProvider theme={customTheme}>
                    <MenuAppBar history={history}/>
                    <Switch>
                        <Route exact path="/" component={HomePage}/>
                        <PrivateRoute exact path="/dashboard" component={MyHomePage}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/signup" component={SignUp}/>
                        <Redirect from="*" to="/"/>
                    </Switch>
                </MuiThemeProvider>
            </BrowserRouter>
        </div>
    );
};

export default App;

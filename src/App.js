import './App.css'

import React, {Fragment} from 'react';
import Navbar from "./components/layout/Navbar";
import User from "./components/users/User";
import Alert from "./components/layout/Alert";
import About from './components/pages/About';
import Home from "./components/pages/Home";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import GithubState from "./context/github/GithubState";
import AlertState from "./context/alert/AlertState";
import NotFound from "./components/pages/NotFound";
const App = () => {
    return (
        <GithubState>
            <AlertState>
                <Router>
                    <Fragment>
                        <Navbar icon="fab fa-github" title="Github Finder"/>
                        <div className="container">
                            <Alert/>
                            <Switch>
                                <Route exact path='/' component={Home}/>
                                <Route exact path='/about' component={About}/>
                                <Route exact path='/user/:user' component={User}/>
                                <Route component={NotFound}/>
                            </Switch>
                        </div>
                    </Fragment>
                </Router>
            </AlertState>

        </GithubState>
    )


}

export default App;
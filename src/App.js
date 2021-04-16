import './App.css'
import React, {Component, Fragment, useState} from 'react';
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import axios from 'axios'
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from './components/pages/About';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

const App = () => {

    const [users, setUsers] = useState([]);
    const [showClearButton, setShowClearButton] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);
    const [user, setUser] = useState({});
    const [repos, setRepos] = useState([]);

    const searchUsers = async (text) => {
        setLoading(true);

        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        setLoading(false);
        setShowClearButton(true);
        setUsers(res.data.items);
    }

    const getSingleUser = async (username) => {
        setLoading(true);
        const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        setLoading(false);
        setUser(res.data)
    }

    const getUserRepos = async (username) => {
        setLoading(true);
        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&short=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        setLoading(false);
        setRepos(res.data)
    }


    const clearUsers = () => {
        setLoading(false);
        setShowClearButton(false);
        setUsers([]);

    }

    const setErrorAlert = (message, type) => {
        setAlert({
            msg: message,
            type: type
        });
        setTimeout(() => {
            setAlert(null);
        }, 3000)
    }

        return (
            <Router>
                <Fragment>
                    <Navbar icon="fab fa-github" title="Github Finder"/>
                    <div className="container">
                        <Alert alert={alert}/>
                        <Switch>
                            <Route exact path='/' render={props => (
                                <Fragment>
                                    <Search
                                        setAlert={setErrorAlert}
                                        showClearButton={showClearButton}
                                        searchUsers={searchUsers}
                                        clearUsers={clearUsers}/>
                                    <Users loading={loading} users={users}/>
                                </Fragment>
                            )}/>

                            <Route exact path='/about' component={About}/>

                            <Route exact path='/user' component={User}/>

                            <Route exact path='/user/:user' render={props => (
                                <Fragment>
                                    <User {...props} loading={loading} getSingleUser={getSingleUser}
                                          getUserRepos={getUserRepos} user={user} repos={repos}/>
                                </Fragment>
                            )}/>

                        </Switch>

                    </div>
                </Fragment>
            </Router>
        )


}

export default App;
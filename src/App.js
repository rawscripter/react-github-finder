import './App.css'
import React, {Component, Fragment} from 'react';
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

class App extends Component {
    state = {
        users: [],
        showClearButton: false,
        loading: false,
        alert: null,
        user: {},
        repos: []
    }

    searchUsers = async (text) => {
        this.setState({
            loading: true,
        })
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        this.setState({
            loading: false,
            showClearButton: true,
            users: res.data.items,
        })
    }

    getSingleUser = async (username) => {
        this.setState({
            loading: true,
        })
        const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        this.setState({
            loading: false,
            user: res.data
        })
    }

    getUserRepos = async (username) => {
        this.setState({
            loading: true,
        })
        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&short=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        this.setState({
            loading: false,
            repos: res.data
        })
    }


    clearUsers = () => {
        this.setState({
            loading: false,
            showClearButton: false,
            users: []
        })
    }

    setAlert = (message, type) => {
        this.setState({
            alert: {
                msg: message,
                type: type
            }
        });
        setTimeout(() => {
            this.setState({
                alert: null
            });
        }, 3000)
    }

    render() {
        const {showClearButton, loading, users, user, repos} = this.state;
        return (
            <Router>
                <Fragment>
                    <Navbar icon="fab fa-github" title="Github Finder"/>
                    <div className="container">
                        <Alert alert={this.state.alert}/>
                        <Switch>
                            <Route exact path='/' render={props => (
                                <Fragment>
                                    <Search
                                        setAlert={this.setAlert}
                                        showClearButton={showClearButton}
                                        searchUsers={this.searchUsers}
                                        clearUsers={this.clearUsers}/>
                                    <Users loading={loading} users={users}/>
                                </Fragment>
                            )}/>

                            <Route exact path='/about' component={About}/>

                            <Route exact path='/user' component={User}/>

                            <Route exact path='/user/:user' render={props => (
                                <Fragment>
                                    <User {...props} loading={loading} getSingleUser={this.getSingleUser}
                                          getUserRepos={this.getUserRepos} user={user} repos={repos}/>
                                </Fragment>
                            )}/>

                        </Switch>

                    </div>
                </Fragment>
            </Router>
        )
    }

}

export default App;
import './App.css'
import React, {Component, Fragment} from 'react';
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import axios from 'axios'
import Search from "./components/users/Search";

class App extends Component {
    state = {
        users: [],
        loading: false
    }

    searchUsers = async (text) => {
        this.setState({
            loading: true,
        })
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        this.setState({
            loading: false,
            users: res.data.items
        })
    }

    render() {
        return (
            <Fragment>
                <Navbar icon="fab fa-github" title="Github Finder"/>
                <div className="container">
                    <Search searchUsers={this.searchUsers}/>
                    <Users loading={this.state.loading} users={this.state.users}/>
                </div>
            </Fragment>
        )
    }

}

export default App;
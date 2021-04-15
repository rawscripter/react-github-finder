import React, {Component, Fragment} from 'react';
import Spinner from "../layout/Spinner";
import PropTypes from 'prop-types';
import {
    Link
} from "react-router-dom";
import Repos from "../repos/Repos";

class User extends Component {

    static  propTypes = {
        loading: PropTypes.bool.isRequired,
        user: PropTypes.object.isRequired,
        getSingleUser: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.getSingleUser(this.props.match.params.user)
        this.props.getUserRepos(this.props.match.params.user)
    }

    render() {


        const {
            login,
            name,
            public_repos,
            public_gists,
            followers,
            following,
            avatar_url,
            bio,
            blog,
            html_url,
            location,
            hireable,
            company
        } = this.props.user;


        const {loading, repos} = this.props;
        if (loading)
            return (
                <Spinner/>
            )


        return (
            <Fragment>
                <Link to='/' className='btn btn-light'>
                    Back To Search
                </Link>
                Hireable: {' '}
                {hireable ? <i className='fas fa-check text-success'/> :
                    <i className='fas fa-times-circle text-danger'/>}


                <div className="card grid-2">
                    <div className="all-center">
                        <img src={avatar_url} className='round-img' style={{width: '150px'}} alt={name}/>
                        <h1>Name: {name}</h1>
                        <p>Location: {location}</p>
                    </div>
                    <div>
                        {bio && <Fragment>
                            <h3>Bio</h3>
                            <p>{bio}</p>
                        </Fragment>
                        }
                        <a href={html_url} className='btn btn-dark my-1'>Visit Github Profile</a>
                        <ul>
                            <li>
                                {login && <Fragment>
                                    <strong>Username:</strong> {login}
                                </Fragment>}
                            </li>
                            <li>
                                {company && <Fragment>
                                    <strong>Company:</strong> {company}
                                </Fragment>}
                            </li>
                            <li>
                                {blog && <Fragment>
                                    <strong>Website:</strong> {blog}
                                </Fragment>}
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="card text-center">
                    <div className="badge badge-dark">Followers: {followers}</div>
                    <div className="badge badge-danger">Following: {following}</div>
                    <div className="badge badge-success">Public Repos: {public_repos}</div>
                    <div className="badge badge-light">Public Gists: {public_gists}</div>
                </div>
                <Repos repos={repos}/>
            </Fragment>
        );
    }
}


export default User;
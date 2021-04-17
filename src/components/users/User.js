import React, {useEffect, useContext, Fragment} from 'react';
import Spinner from "../layout/Spinner";
import GithubContext from "../../context/github/githubContext";
import {
    Link
} from "react-router-dom";
import Repos from "../repos/Repos";

const User = ({match}) => {
    const githubContext = useContext(GithubContext);

    const {user, loading, getUser,getUserRepos,repos} = githubContext
    useEffect(() => {
        getUser(match.params.user)
        getUserRepos(match.params.user)
        //eslint-disable-next-line
    }, []);


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
    } = user;


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


export default User;
import React from 'react';
import {
    Link
} from "react-router-dom";

const UserItem = ({user: {avatar_url, login, url}}) => {
    return (
        <div className="card text-center">
            <img src={avatar_url} style={{width: '60px'}} className="round-img" alt=""/>
            <h3>{login}</h3>
            <div>
                <Link to={`/user/${login}`} className="btn btn-dark btn-sm my-1">Learn More</Link>
            </div>
        </div>
    );

}

export default UserItem;
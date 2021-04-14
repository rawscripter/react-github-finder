import React from 'react';

const UserItem = ({user: {avatar_url, login, url}}) => {
    return (
        <div className="card text-center">
            <img src={avatar_url} style={{width: '60px'}} className="round-img" alt=""/>
            <h3>{login}</h3>
            <div>
                <a href={url} className="btn btn-dark btn-sm my-1">Learn More</a>
            </div>
        </div>
    );

}

export default UserItem;
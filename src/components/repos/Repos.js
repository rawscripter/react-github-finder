import React from 'react';
import RepoItem from './RepoItem'

const Repos = ({repos}) => {
    return (
        <div>
            {repos.map(repo => (
                <div key={repo.id} className='card'>
                    <RepoItem repo={repo}/>
                </div>
            ))}
        </div>
    );
};

export default Repos;

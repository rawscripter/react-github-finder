import React from 'react';

const Repo = ({repo: {name, stargazers_count, forks, description, html_url}}) => {
    return (
        <div>
            <a rel="noreferrer" href={html_url} target='_blank'><h3>{name}</h3></a>
            {description && <p>{description}</p>}
            <p>Stars: {stargazers_count}</p>
            <p>Forks: {forks}</p>
        </div>
    );
};

export default Repo;

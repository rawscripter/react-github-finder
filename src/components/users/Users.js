import React, {useContext} from 'react';
import UserItem from "./UserItem";
import Spinner from "../layout/Spinner";
import GithubContext from "../../context/github/githubContext";

const Users = () => {
    const githubContext = useContext(GithubContext);
    const {users, loading} = githubContext;

    if (loading)
        return (
            <Spinner/>
        )
        return (
            <div className="userGrid">
                {users.map(user => (
                    <div key={user.id}>
                        <UserItem user={user}/>
                    </div>
                ))}
            </div>
        )
    }


export default Users;
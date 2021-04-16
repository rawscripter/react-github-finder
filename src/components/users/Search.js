import React, {Fragment, useState, useContext} from 'react';
import GithubContext from "../../context/github/githubContext";
import AlertContext from "../../context/alert/alertContext";

const Search = () => {
    const githubContext = useContext(GithubContext);
    const alertContext = useContext(AlertContext);
    const [text, setText] = useState('');

    const {clearUsers, users, searchUsers} = githubContext;
    const {setAlert} = alertContext;
    const onChange = (e) => {
        setText(e.target.value)
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if (text.trim() === '') {
            setAlert('Please enter something', 'light');
            return
        }
        searchUsers(text);
        setText('');
    }

    return (
        <Fragment>
            <form onSubmit={onSubmit} className='form'>
                <input value={text} onChange={onChange} type="text" name="text"
                       placeholder="Search User..."/>
                <input type="submit" value="Search" className="btn btn-dark btn-block"/>
            </form>

            {users.length > 0 &&
            <button className="btn btn-light btn-block" onClick={clearUsers}>
                Clear
            </button>
            }
        </Fragment>
    );

}


export default Search;
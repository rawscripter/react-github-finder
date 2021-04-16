import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';

const Search = ({showClearButton, clearUsers, searchUsers, setAlert}) => {
    const [text, setText] = useState('');


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

            {showClearButton === true &&
            <button className="btn btn-light btn-block" onClick={clearUsers}>
                Clear
            </button>
            }
        </Fragment>
    );

}
Search.propTypes = {
    clearUsers: PropTypes.func.isRequired,
    searchUsers: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    showClearButton: PropTypes.bool.isRequired,
}

export default Search;
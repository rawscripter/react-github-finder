import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
    state = {
        text: ''
    }

    static propTypes = {
        clearUsers: PropTypes.func.isRequired,
        searchUsers: PropTypes.func.isRequired,
        setAlert: PropTypes.func.isRequired,
        showClearButton: PropTypes.bool.isRequired,
    }
    onChange = (e) => {
        this.setState({
            text: e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.text.trim() === '') {
            this.props.setAlert('Please enter something', 'light');
            return
        }

        this.props.searchUsers(this.state.text);
        this.setState({
            text: ''
        })
    }

    render() {
        const {showClearButton, clearUsers} = this.props;
        return (
            <Fragment>
                <form onSubmit={this.onSubmit} className='form'>
                    <input value={this.state.text} onChange={this.onChange} type="text" name="text"
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
}

export default Search;
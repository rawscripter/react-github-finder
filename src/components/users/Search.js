import React, {Component} from 'react';

class Search extends Component {
    state = {
        text: ''
    }
    onChange = (e) => {
        this.setState({
            text: e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.text.trim().length < 1) return;
        this.props.searchUsers(this.state.text);
        this.setState({
            text: ''
        })
    }

    render() {
        return (
            <form onSubmit={this.onSubmit} className='form'>
                <input value={this.state.text} onChange={this.onChange} type="text" name="text"
                       placeholder="Search User..."/>
                <input type="submit" value="Search" className="btn btn-dark btn-block"/>
            </form>
        );
    }
}

export default Search;
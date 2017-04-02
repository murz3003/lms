import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import { getUser } from '../actions/actionCreators';

import '../css/ProfilePage.css';

class ProfilePage extends Component {

    componentWillMount() {
        if (!this.props.user) {
            this.props.router.push('/login');
        }
    }

    componentDidMount() {
        this.props.dispatch(getUser());
    }

    render() {
        return (
            <div className="profile-page">
                <p>This is the profile page</p>

                <Link to="/">Home Page</Link>
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(ProfilePage);

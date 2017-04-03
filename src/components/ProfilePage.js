import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getUserProfile } from '../actions/actionCreators';

import '../css/ProfilePage.css';

class ProfilePage extends Component {

    componentWillMount() {
        if (!this.props.user) {
            this.props.router.push('/login');
        }
    }

    componentDidMount() {
        if (this.props.user) {
            this.props.dispatch(getUserProfile());
        }
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

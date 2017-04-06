import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import { socialLogin } from '../actions/actionCreators';

import '../css/LoginPage.css';

class LoginPage extends Component {

    componentWillMount() {
        if (this.props.user) {
            this.props.history.push('/profile');
        }
    }

    componentWillUpdate(nextProps) {
        if (nextProps.user) {
            this.props.history.push('/');
        }
    }

    handleSocialLogin(socialData, provider) {
        this.props.dispatch(socialLogin(socialData, provider));
    }

    render() {
        return (!this.props.user && (
            <div className="login-page">
                <div>
                    <GoogleLogin
                        clientId="162701122782-3bfogihclh49gfc91r797ctlnhvmeh0a.apps.googleusercontent.com"
                        onSuccess={response => { this.handleSocialLogin(response, 'google')}}
                        onFailure={response => { this.handleSocialLogin(response, 'google')}}
                    />
                </div>

                <Link to="/">Home Page</Link>
            </div>
        ));
    }
}

function mapStateToProps (state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(LoginPage);

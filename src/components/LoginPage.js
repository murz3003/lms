import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import { socialLogin } from '../actions/actionCreators';

import '../css/LoginPage.css';

class LoginPage extends Component {

    handleSocialLogin(socialData, provider) {
        debugger;
        this.props.dispatch(socialLogin(socialData, provider));
    }

    render() {
        return (
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
        );
    }
}

function mapStateToProps (state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(LoginPage);

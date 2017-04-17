import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import '../css/Header.css';
import logo from '../images/logo.svg';

const Header = (props) => {
    const { pathname } = props.router.location;
    const className = classNames({
        header: true,
        'header-small': pathname !== '/'
    });

    return (
        <div className={className}>
            <Link to="/">
                <img src={logo} className="header-logo" alt="logo" />
                <h2 className="header-title">{pathname === '/' ? 'Welcome to LMS' : 'Last Man Standing'}</h2>
            </Link>
        </div>
    );
}

function mapStateToProps (state) {
    return {
        router: state.router
    };
}

export default connect(mapStateToProps)(Header);

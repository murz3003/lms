import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import '../css/Header.css';
import logo from '../images/logo.svg';

const Header = (props) => {
    debugger;
    const className = classNames({
        header: true,
        'header-small': props.pathname !== '/'
    });

    return (
        <div className={className}>
            <Link to="/">
                <img src={logo} className="header-logo" alt="logo" />
                <h2 className="header-title">{props.pathname === '/' ? 'Welcome to LMS' : 'Last Man Standing'}</h2>
            </Link>
        </div>
    )
}

export default Header;

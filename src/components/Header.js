import React from 'react';
import { Link } from 'react-router';

import '../css/Header.css';
import logo from '../images/logo.svg';

const Header = () => {
    return (
        <div className="header">
            <Link to="/">
                <img src={logo} className="logo" alt="logo" />
                <h2>Welcome to LMS</h2>
            </Link>
        </div>
    )
}

export default Header;

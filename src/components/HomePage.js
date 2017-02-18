import React, { Component } from 'react';
import { Link } from 'react-router';

import '../css/HomePage.css';

class HomePage extends Component {
    render() {
        return (
            <div className="home">
                <p>This is the Home Page</p>
                <Link to="/competition">Competition Page</Link>
            </div>
        );
    }
}

export default HomePage;

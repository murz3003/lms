import React, { Component } from 'react';
import { Link } from 'react-router';

import '../css/CompetitionPage.css';

class CompetitionPage extends Component {
    render() {
        return (
            <div className="competition">
                <p>This is the Competition Page</p>
                <Link to="/">Home Page</Link>
            </div>
        );
    }
}

export default CompetitionPage;

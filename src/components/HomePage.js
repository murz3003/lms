import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getCompetitions } from '../actions/actionCreators';

import '../css/HomePage.css';

class HomePage extends Component {

    componentDidMount() {
        this.props.dispatch(getCompetitions());
    }

    render() {
        return (
            <div className="home">
                <p>This is the Home Page</p>
                <ul>
                    {this.props.competitions.available.map((competition, i) => (<li key={i}>{competition.title}</li>))}
                </ul>
                <Link to="/competition">Competition Page</Link>
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        competitions: state.competitions
    };
}

export default connect(mapStateToProps)(HomePage);

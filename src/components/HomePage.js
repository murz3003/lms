import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getCompetitions } from '../actions/actionCreators';

import Card from './Card';
import CompetitionCard from './CompetitionCard';
import '../css/HomePage.css';

class HomePage extends Component {

    componentDidMount() {
        this.props.dispatch(getCompetitions());
    }

    render() {
        return (
            <div className="home">
                <p>This is the Home Page</p>

                <h3>In progress</h3>
                {this.props.competitions.entered.map((competition, i) => (
                    <Card key={i}>
                        <CompetitionCard league={competition.league} round={competition.round} players={competition.players} hasEntered={competition.entered} inProgress={true} pickedTeam={competition.entered.pickedTeam} streak={competition.streak} />
                    </Card>
                ))}

                <h3>Competitions</h3>
                {this.props.competitions.available.map((competition, i) => (
                    <Card key={i}>
                        <CompetitionCard league={competition.league} round={competition.round} players={competition.players} hasEntered={competition.entered} inProgress={false} />
                    </Card>
                ))}

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

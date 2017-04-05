import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCompetitions, selectedCompetition } from '../actions/actionCreators';

import '../css/HomePage.css';
import Card from './Card';
import CompetitionCard from './CompetitionCard';

class HomePage extends Component {

    componentDidMount() {
        this.props.dispatch(getCompetitions());
    }

    handleCompetitionCardClick(competition) {
        this.props.dispatch(selectedCompetition(competition));
    }

    render() {
        debugger;
        return (
            <div>
                <p>Home page here</p>
                <Link to="/login">Login page</Link>
            </div>
        );
        // return (
        //     <div className="home-page">
        //         <p>This is the Home Page</p>
        //
        //         <h3>In progress</h3>
        //         {this.props.competitions.entered.map((competition, i) => (
        //             <Card key={i} onClick={() => { this.handleCompetitionCardClick(competition); }}>
        //                 <CompetitionCard league={competition.league} round={competition.round} players={competition.players} hasEntered={competition.entered} inProgress={true} pickedTeam={competition.pickedTeam} streak={competition.streak} />
        //             </Card>
        //         ))}
        //
        //         <h3>Competitions</h3>
        //         {this.props.competitions.available.map((competition, i) => (
        //             <Card key={i}>
        //                 <CompetitionCard league={competition.league} round={competition.round} players={competition.players} hasEntered={competition.entered} inProgress={false} />
        //             </Card>
        //         ))}
        //
        //         <Link to="/login">Login</Link>
        //     </div>
        // );
    }
}

function mapStateToProps (state) {
    return {
        competitions: state.competitions
    };
}

export default connect(mapStateToProps)(HomePage);

import React, { Component } from 'react';
import Moment from 'react-moment';
import { selectedFixture } from '../actions/actionCreators';

import '../css/Fixture.css';

class Fixture extends Component {

    handleFixtureSelect(team) {
        debugger;
        this.props.dispatch(selectedFixture(this.props.fixture, team));
    }

    render() {
        const { fixture } = this.props;
        const played = !!fixture.played;
        const homeCrest = require(`../images/teams/crest-${fixture.home_team_slug}.svg`);
        const awayCrest = require(`../images/teams/crest-${fixture.away_team_slug}.svg`);
        const startMoment = <Moment format={`h:mma`} date={fixture.date_match} />;

        return (
            <div className="fixture">

                <div className="home-team">
                    <button onClick={this.handleFixtureSelect.bind(this, 'home')} className="btn btn-primary">{fixture.home_team_short_name}</button>
                    <div className="team-crest">
                        <img src={homeCrest} alt={`${fixture.home_team} Crest`} />
                    </div>
                </div>

                {played
                    ? <span className="score">{fixture.home_score} - {fixture.away_score}</span>
                    : <span className="versus">v</span>
                }

                <div className="away-team">
                    <div className="team-crest">
                        <img src={awayCrest} alt={`${fixture.home_team} Crest`} />
                    </div>
                    <button onClick={this.handleFixtureSelect.bind(this, 'home')} className="btn btn-primary">{fixture.away_team_short_name}</button>
                </div>

                {startMoment}
            </div>
        );
    }
}

export default Fixture;

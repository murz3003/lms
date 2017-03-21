import React, { Component } from 'react';
import Moment from 'react-moment';

import '../css/Fixture.css';

class Fixture extends Component {

    render() {
        const { fixture } = this.props;
        const homeCrest = require(`../images/teams/crest-${fixture.home_team_slug}.svg`);
        const awayCrest = require(`../images/teams/crest-${fixture.away_team_slug}.svg`);
        const startMoment = <Moment format={`h:mma`} date={fixture.date_match} />;

        return (
            <div className="fixture">
                <div className="home-team">
                    {fixture.home_team}
                    <div className="team-crest">
                        <img src={homeCrest} alt={`${fixture.home_team} Crest`} />
                    </div>
                </div>
                <span className="versus">v</span>
                <div className="away-team">
                    <div className="team-crest">
                        <img src={awayCrest} alt={`${fixture.home_team} Crest`} />
                    </div>
                    {fixture.away_team}
                </div>
                {startMoment}
            </div>
        );
    }
}

export default Fixture;

import React, { Component } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getCompetitionDetails } from '../actions/actionCreators';

import '../css/CompetitionPage.css';
import Card from './Card';
import CardHeader from './CardHeader';

class CompetitionPage extends Component {

    componentDidMount() {
        this.props.dispatch(getCompetitionDetails(this.props.params.leagueSlug, this.props.params.roundSlug));
    }

    render() {
        debugger;
        const { league, round } = this.props;
        const now = new Date();
        const start = new Date(round.start_date);
        const hasStarted = now > start;
        const startMoment = start && <Moment format={`[${hasStarted ? 'Started' : 'Starts'} on] D MMMM`} date={start} fromNow />;
        const leagueLogo = league.league_slug && require(`../images/leagues/${league.league_slug}.svg`);

        return (
            <div className="competition">
                <p>This is the Competition Page</p>

                {league && round ? (
                    <Card>
                        <div className="league-logo">
                            <img src={leagueLogo} alt={`${league.name} Logo`} />
                        </div>
                        <div className="competition-details">
                            <CardHeader header={league.name} subheader={startMoment} />
                        </div>
                    </Card>
                ) : null}

                <Link to="/">Home Page</Link>
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        league: state.competitionDetails.league,
        round: state.competitionDetails.round
    };
}

export default connect(mapStateToProps)(CompetitionPage);

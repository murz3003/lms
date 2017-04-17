import React, { Component } from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCompetitionDetails } from '../actions/actionCreators';

import '../css/CompetitionPage.css';
import Card from './Card';
import CardSection from './CardSection';
import CardHeader from './CardHeader';
import Fixture from './Fixture';

class CompetitionPage extends Component {

    componentDidMount() {
        const { params } = this.props.match;

        this.props.dispatch(getCompetitionDetails(params.leagueSlug, params.roundSlug));
    }

    render() {
        const { league, round, fixtures } = this.props;
        const now = new Date();
        const start = round && new Date(round.start_date);
        const hasStarted = now > start;
        const startMoment = start && <Moment format={`[${hasStarted ? 'Started' : 'Starts'} on] D MMMM`} date={start} fromNow />;
        const leagueLogo = league && require(`../images/leagues/${league.league_slug}.svg`);
        const sections = fixtures.reduce((prev, fixture) => {
            const date = moment(fixture.date_match).format('dddd D MMMM YYYY');

            if (!prev[date]) {
                prev[date] = [];
            }

            prev[date].push(fixture);

            return prev;
        }, {});

        return (
            <div className="competition-page">
                {league && round ? (
                    <Card>
                        <div className="competition-card competition-card-small">
                            <div className="league-logo">
                                <img src={leagueLogo} alt={`${league.name} Logo`} />
                            </div>
                            <div className="competition-details">
                                <CardHeader header={league.name} subheader={startMoment} />
                            </div>
                        </div>
                    </Card>
                ) : null}

                <h3>Fixtures</h3>
                {this.props.fixtures.length ? (
                    <Card sections={sections}>
                        {Object.keys(sections).map((title, i) => {
                            return (
                                <CardSection key={i} title={title}>
                                    {sections[title].map((fixture, i) => (
                                        <Fixture key={i} fixture={fixture} />
                                    ))}
                                </CardSection>
                            );
                        })}
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
        round: state.competitionDetails.round,
        fixtures: state.competitionDetails.fixtures
    };
}

export default connect(mapStateToProps)(CompetitionPage);

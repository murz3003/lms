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
        const { competitionDetails, competitionDetails: { id }, match: { params } } = this.props;

        if (!(id && competitionDetails[id] && competitionDetails[id].round && competitionDetails[id].round.fixtures)) {
            this.props.dispatch(getCompetitionDetails(params.leagueSlug, params.roundSlug));
        }
    }

    render() {
        const { competitionDetails, competitionDetails: { id } } = this.props;
        const { competition, round } = competitionDetails[id] || {};
        const { league } = competition || {};

        const now = new Date();
        const start = competition && new Date(competition.starts);
        const hasStarted = now > start;
        const startMoment = start && <Moment format={`[${hasStarted ? 'Started' : 'Starts'} on] D MMMM`} date={start} fromNow />;
        const leagueLogo = league && require(`../images/leagues/${league.league_slug}.svg`);
        const sections = round && round.fixtures.reduce((prev, fixture) => {
            const date = moment(fixture.date_match).format('dddd D MMMM YYYY');

            if (!prev[date]) {
                prev[date] = [];
            }

            prev[date].push(fixture);

            return prev;
        }, {});

        return (
            <div className="competition-page">
                {competition &&
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
                }

                <h3>Fixtures</h3>
                {round && round.fixtures.length &&
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
                }

                <Link to="/">Home Page</Link>
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        competitionDetails: state.competitionDetails
    };
}

export default connect(mapStateToProps)(CompetitionPage);

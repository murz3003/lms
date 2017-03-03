import React, { Component } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router';

import '../css/CompetitionCard.css';
import CardHeader from './CardHeader';
import iconPlayers from '../images/icon-player.svg';
import iconSelected from '../images/icon-selected.svg';
import iconUnselected from '../images/icon-unselected.svg';
import iconCalendar from '../images/icon-calendar.svg';

class CompetitionCard extends Component {

    render() {
        const { league, round, players, hasEntered, inProgress, pickedTeam } = this.props;
        const now = new Date();
        const start = new Date(round.start_date);
        const hasStarted = now > start;
        const leagueLogo = require(`../images/leagues/${league.league_slug}.svg`);
        const startMoment = <Moment format={`[${hasStarted ? 'Started' : 'Starts'} on] D MMMM`} date={start} fromNow />;

        return (
            <Link to={`/competition/${league.league_slug}/${round.round_slug}`}>
                <div className="competition-card">
                    <div className="league-logo">
                        <img src={leagueLogo} alt={`${league.name} Logo`} />
                    </div>
                    <div className="competition-details">

                        <CardHeader header={league.name} subheader={startMoment}>
                            <div className="icons icons-row">
                                <div className="icon-wrapper">
                                    <img className="icon" src={iconPlayers} alt="Players" />
                                    {hasStarted ? `${players.remaining}/${players.entered}` : `${players.entered}` }
                                </div>
                            </div>
                        </CardHeader>

                    </div>
                    <div className="competition-actions">
                        {inProgress ? (
                            <div className="icons icons-column">
                                <div className="icon-wrapper">
                                    <img className="icon" src={pickedTeam ? iconSelected : iconUnselected} alt="Team Selected" />
                                    {pickedTeam ? pickedTeam.shortName : '-'}
                                </div>
                                <div className="icon-wrapper">
                                    <img className="icon" src={iconCalendar} alt="Current Streak" />{this.props.streak}
                                </div>
                            </div>
                        ) : null }

                        {inProgress ?
                            (pickedTeam ? (
                                <button className="btn btn-primary">Change</button>
                            ) : (
                                <button className="btn btn-primary">Choose</button>
                            )) :
                            (hasEntered ? (
                                <button className="btn btn-disabled" disabled>Entered</button>
                            ) : (
                                <button className="btn btn-primary">Play</button>
                            ))
                        }
                    </div>
                </div>
            </Link>
        );
    }
}

export default CompetitionCard;

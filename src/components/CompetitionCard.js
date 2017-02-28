import React, { Component } from 'react';
import Moment from 'react-moment';
// import { Link } from 'react-router';

import '../css/CompetitionCard.css';
import iconPlayers from '../images/icon-player.svg';
import iconSelected from '../images/icon-selected.svg';
import iconUnselected from '../images/icon-unselected.svg';
import iconCalendar from '../images/icon-calendar.svg';

class CompetitionCard extends Component {

    render() {
        const { league, round, players, pickedTeam, hasEntered, inProgress } = this.props;
        const now = new Date();
        const start = new Date(round.start_date);
        const hasStarted = now > start;
        const leagueLogo = require(`../images/leagues/${league.league_slug}.svg`);

        return (
            <div className="competition-card">
                <div className="league-logo">
                    <img src={leagueLogo} alt={`${league.name} Logo`} />
                </div>
                <div className="competition-details">

                    <h3 className="competition-header">{league.name}</h3>

                    <div className="competition-subheader">
                        {hasStarted ? 'Started on ' : 'Starts on '}<Moment format="D MMMM" date={start} fromNow />
                    </div>

                    <div className="icons icons-row">
                        <div className="icon-wrapper">
                            <img className="icon" src={iconPlayers} alt="Players" />
                            {hasStarted ? `${players.remaining}/${players.entered}` : `${players.entered}` }
                        </div>
                    </div>

                </div>
                <div className="competition-actions">
                    {pickedTeam !== null ? (
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
                    <button className="btn">
                        {hasEntered && inProgress && pickedTeam ? 'Change' : (hasEntered && !inProgress ? 'Entered' : 'Play')}
                    </button>
                </div>
            </div>
        );
    }
}

export default CompetitionCard;

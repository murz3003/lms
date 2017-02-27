import React, { Component } from 'react';
import Moment from 'react-moment';
// import { Link } from 'react-router';

import '../css/CompetitionCard.css';

class CompetitionCard extends Component {

    render() {
		const now = new Date();
		const start = new Date(this.props.round.start_date);

        return (
            <div className="competition-card">
				<h4>{this.props.league.name}</h4>
				<div>{now < start ? 'Starts on ' : 'Started on '}<Moment format="D MMMM" date={start} fromNow /></div>
            </div>
        );
    }
}

export default CompetitionCard;

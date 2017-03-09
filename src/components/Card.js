import React, { Component } from 'react';
// import { Link } from 'react-router';

import '../css/Card.css';

class Card extends Component {

    render() {
        return (
            <div className="card" onClick={this.props.onClick}>
                {this.props.children}
            </div>
        );
    }
}

export default Card;

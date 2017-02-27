import React, { Component } from 'react';
// import { Link } from 'react-router';

import '../css/Card.css';

class Card extends Component {

    render() {
        return (
            <div className="card">
                {React.cloneElement(this.props.children, this.props)}
            </div>
        );
    }
}

export default Card;

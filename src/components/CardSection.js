import React, { Component } from 'react';

import '../css/CardSection.css';

class CardSection extends Component {

    render() {
        return (
            <div className="card-section">
                <h4>{this.props.title}</h4>
                {this.props.children}
            </div>
        );
    }
}

export default CardSection;

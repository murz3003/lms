import React, { Component } from 'react';
import classNames from 'classnames';

import '../css/Card.css';

class Card extends Component {

    render() {
        const className = classNames({
            card: true,
            'card-sections': this.props.sections
        });

        return (
            <div className={className} onClick={this.props.onClick}>
                {this.props.children}
            </div>
        );
    }
}

export default Card;

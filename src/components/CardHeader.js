import React, { Component } from 'react';

import '../css/CardHeader.css';

class CardHeader extends Component {
    render() {
        return (
            <div className="card-header">
                <h3 className="competition-header">{this.props.header}</h3>

                <div className="competition-subheader">{this.props.subheader}</div>

                {this.props.children}
            </div>
        );
    }
}

export default CardHeader;

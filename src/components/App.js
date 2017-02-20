import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './Header';
import '../css/App.css';

class App extends Component {
    render() {
        return (
            <div className="app">
                <Header />
                {React.cloneElement(this.props.children, this.props)}
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        competitions: state.competitions
    };
}

export default connect(mapStateToProps)(App);

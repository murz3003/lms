import React, { Component } from 'react';

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

export default App;

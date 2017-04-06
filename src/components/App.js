import React from 'react';

import Header from './Header';
import '../css/App.css';

const App = (props) => {
    return (
        <div className="app">
            <Header />
            {props.children}
        </div>
    );
}

export default App;

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store';

import App from './components/App';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import LoginPage from './components/LoginPage';
import CompetitionPage from './components/CompetitionPage';
import NotFound from './components/NotFound';

const router = (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/login" component={LoginPage} />
            </App>
        </ConnectedRouter>
    </Provider>
);

render(router, document.getElementById('root'));

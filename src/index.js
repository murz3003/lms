import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
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
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/profile" component={ProfilePage} />
                    <Route path="/competition/:leagueSlug/:roundSlug" component={CompetitionPage} />
                    <Route component={NotFound} />
                </Switch>
            </App>
        </ConnectedRouter>
    </Provider>
);

render(router, document.getElementById('root'));

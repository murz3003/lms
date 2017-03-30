import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';

import App from './components/App';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import CompetitionPage from './components/CompetitionPage';
import NotFound from './components/NotFound';

const router = (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={HomePage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/competition/:leagueSlug/:roundSlug" component={CompetitionPage} />
                <Route path="*" component={NotFound} />
             </Route>
        </Router>
    </Provider>
);

render(router, document.getElementById('root'));

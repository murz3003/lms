import { createBrowserHistory as createHistory } from 'history';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk';
import jwt_decode from 'jwt-decode';

import rootReducer from './reducers/index';

const history = createHistory();
const middleware = routerMiddleware(history)

const token = localStorage.getItem('accessToken');
const defaultState = {
    competitions: {
        entered: [],
        available: [],
        ended: []
    },
    competitionDetails: {
        league: null,
        round: null,
        fixtures: []
    },
    user: (token ? jwt_decode(token) : null)
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, defaultState, composeEnhancers(applyMiddleware(middleware, thunk)));

export { history };

export default store;

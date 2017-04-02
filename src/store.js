import { createStore, applyMiddleware, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import jwt_decode from 'jwt-decode';

import rootReducer from './reducers/index';

debugger;
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
    user: jwt_decode(localStorage.getItem('accessToken')) || null
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, defaultState, composeEnhancers(applyMiddleware(thunk)));

export const history = syncHistoryWithStore(browserHistory, store);

export default store;

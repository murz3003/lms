import { createStore, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';

import rootReducer from './reducers/index';

const defaultState = {
    competitions: {
        entered: {
            title: 'In progress',
            list: []
        },
        available: {
            title: 'Competitions',
            list: []
        },
        ended: {
            title: 'Ended',
            list: []
        }
    }
};

const store = createStore(rootReducer, defaultState, applyMiddleware(thunk));

export const history = syncHistoryWithStore(browserHistory, store);

export default store;

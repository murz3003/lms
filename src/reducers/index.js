import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';

import competitions from './competitions';

const rootReducer = combineReducers({
    competitions,
    routing: routerReducer
});

export default rootReducer;

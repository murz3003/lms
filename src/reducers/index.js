import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';

import { competitions, competitionDetails } from './competitions';

const rootReducer = combineReducers({
    competitions,
    competitionDetails,
    routing: routerReducer
});

export default rootReducer;

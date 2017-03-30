import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';

import { competitions, competitionDetails } from './competitions';
import { user } from './user';

const rootReducer = combineReducers({
    competitions,
    competitionDetails,
    user,
    routing: routerReducer
});

export default rootReducer;

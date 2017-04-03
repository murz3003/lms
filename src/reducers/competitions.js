export function competitions (state = {}, action) {
    switch(action.type) {
        case 'GET_COMPETITIONS_SUCCESS':
            state = {...state};
            state = action.competitions;
            break;
        default:
            return state;
    }

    return state;
}

export function competitionDetails (state = {}, action) {
    switch(action.type) {
        case 'GET_COMPETITION_DETAILS_SUCCESS':
            state = {...state};
            state = action.competitionDetails;
            break;
        case 'SELECTED_COMPETITION':
            state = {...state}
            state.league = action.competition.league;
            state.round = action.competition.round;
            break;
        default:
            return state;
    }

    return state;
}

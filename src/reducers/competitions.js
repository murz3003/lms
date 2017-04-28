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
            state.id = action.competitionDetails.competition._id;
            state[action.competitionDetails.competition._id] = action.competitionDetails;
            break;
        case 'SELECTED_COMPETITION':
            state = {...state};
            state.id = action.competition._id;
            state[action.competition._id] = {...state[action.competition._id], competition: action.competition };
            break;
        default:
            return state;
    }

    return state;
}

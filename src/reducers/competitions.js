export function competitions (state = {}, action) {
    console.log(state, action);
    if (action.type === 'FETCHED_COMPETITIONS') {
        state = {...state};
        state = action.competitions;
    }

    return state;
}

export function competitionDetails (state = {}, action) {
    console.log(state, action);
    if (action.type === 'FETCHED_COMPETITION_DETAILS') {
        debugger;
        state = {...state};
        state = action.competitions;
    }

    return state;
}

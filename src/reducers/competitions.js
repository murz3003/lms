function competitions (state = {}, action) {
    console.log(state, action);
    if (action.type === 'FETCHED_COMPETITIONS') {
        state = {...state};
        state.available = action.competitions;
    }

    return state;
}

export default competitions;

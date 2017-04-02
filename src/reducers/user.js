export function user (state = {}, action) {
    switch(action.type) {
        case 'SOCIAL_LOGIN':
            state = {...state};
            state = action.user;
            break;
        default:
            return state;
    }

    return state;
}

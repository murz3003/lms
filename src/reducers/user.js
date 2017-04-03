export function user (state = {}, action) {
    switch(action.type) {
        case 'SOCIAL_LOGIN_SUCCESS':
            state = {...state};
            state = action.user;
            break;
        default:
            return state;
    }

    return state;
}

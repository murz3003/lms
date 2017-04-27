const getAuthHeaders = function () {
    const token = localStorage.getItem('accessToken');

    return token ? { Authorization: `Bearer ${token}`} : {};
}

export function getCompetitions() {
    return dispatch => {
        return fetch('/api/competitions', { headers: getAuthHeaders() })
            .then(res => res.json())
            .then(competitions => dispatch({
                type: 'GET_COMPETITIONS_SUCCESS',
                competitions
            }))
            .catch(error => dispatch({
                type: 'ERROR',
                error
            }));
    };
}

export function selectedCompetition(competition) {
    return {
        type: 'SELECTED_COMPETITION',
        competition
    };
}

export function getCompetitionDetails(leagueSlug, roundSlug) {
    return dispatch => {
        return fetch(`/api/competitions/${leagueSlug}/${roundSlug}`)
            .then(res => res.json())
            .then(competitionDetails => dispatch({
                type: 'GET_COMPETITION_DETAILS_SUCCESS',
                competitionDetails
            }))
            .catch(error => dispatch({
                type: 'ERROR',
                error
            }));
    };
}

export function selectedFixture(fixture, selection) {
    return {
        type: 'SELECTED_FIXTURE',
        fixture,
        selection
    };
}

export function getUserProfile() {
    return dispatch => {
        return fetch('/profile', { headers: getAuthHeaders() })
            .then(res => res.json())
            .then(json => dispatch({
                type: 'GET_USER_PROFILE_SUCCESS',
                user: json.user
            }))
            .catch(error => dispatch({
                type: 'ERROR',
                error
            }));
    }
}

export function socialLogin(socialData, provider) {
    return dispatch => {
        return fetch(`/auth/${provider}`, {
                method: 'POST',
                body: JSON.stringify(socialData)
            })
            .then(res => res.json())
            .then(json => {
                localStorage.setItem('accessToken', json.token);

                dispatch({
                    type: 'SOCIAL_LOGIN_SUCCESS',
                    user: json.user
                });
            })
            .catch(error => dispatch({
                type: 'ERROR',
                error
            }));
    };
}

export function enterCompetition(competitionId) {
    return {
        type: 'ENTER_COMPETITION',
        id: competitionId
    };
}

export function changeTeam(competitionId, team) {
    return {
        type: 'CHANGE_TEAM',
        id: competitionId,
        team
    };
}

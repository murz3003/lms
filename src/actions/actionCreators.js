export function getCompetitions() {
    return dispatch => {
        return fetch('/api/competitions')
            .then(res => res.json())
            .then(competitions => dispatch({
                type: 'FETCHED_COMPETITIONS',
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
                type: 'FETCHED_COMPETITION_DETAILS',
                competitionDetails
            }))
            .catch(error => dispatch({
                type: 'ERROR',
                error
            }));
    };
}

export function socialLogin(socialData, provider) {
    return dispatch => {
        return fetch(`/auth/${provider}`, {
                method: 'POST',
                body: JSON.stringify(socialData)
            })
            .then(res => res.json())
            .then(user => dispatch({
                type: 'SOCIAL_LOGIN',
                user
            }))
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

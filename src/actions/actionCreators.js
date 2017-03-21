export function getCompetitions() {
    return dispatch => {
        return fetch('/api/competitions')
            .then(res => res.json(res))
            .then(
                competitions => dispatch({
                    type: 'FETCHED_COMPETITIONS',
                    competitions
                }),
                error => dispatch({
                    type: 'ERROR',
                    error
                })
            );
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
            .then(res => res.json(res))
            .then(
                competitionDetails => dispatch({
                    type: 'FETCHED_COMPETITION_DETAILS',
                    competitionDetails
                }),
                error => dispatch({
                    type: 'ERROR',
                    error
                })
            );
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

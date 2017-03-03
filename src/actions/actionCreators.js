export function getCompetitions() {
    return dispatch => {
        return fetch('/api/competitions').then(
            res => res.json(res).then(
                competitions => dispatch({
                    type: 'FETCHED_COMPETITIONS',
                    competitions
                }),
                error => dispatch({
                    type: 'ERROR',
                    error
                })
            )
        );
    };
}

export function getCompetitionDetails(leagueSlug, roundSlug) {
    debugger;
    return dispatch => {
        return fetch(`/api/competitions/${leagueSlug}/${roundSlug}`).then(
            res => res.json(res).then(
                competitions => dispatch({
                    type: 'FETCHED_COMPETITION_DETAILS',
                    competitions
                }),
                error => dispatch({
                    type: 'ERROR',
                    error
                })
            )
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

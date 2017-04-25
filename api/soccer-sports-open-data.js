import fetch from 'node-fetch';

import { provider as dataProvider, leagues, currentSeason } from './config';

if (!dataProvider.apiKey) {
    throw new Error(`You must provide an apiKey for the provider: ${dataProvider.name}`);
}

const provider = {
    url: 'https://sportsop-soccer-sports-open-data-v1.p.mashape.com/v1',
    headers: {
        'X-Mashape-Key': dataProvider.apiKey,
        'Accept': 'application/json'
    }
};

const lookups = {
    shortNames: {
        'arsenal': 'ARS',
        'bournemouth': 'BOU',
        'burnley': 'BUR',
        'chelsea': 'CHE',
        'crystal_palace': 'CRY',
        'everton': 'EVE',
        'hull_city': 'HUL',
        'leicester_city': 'LEI',
        'liverpool': 'LIV',
        'man_city': 'MCI',
        'man_united': 'MUN',
        'middlesbrough': 'MFC',
        'southampton': 'SOU',
        'stoke_city': 'STK',
        'sunderland': 'SUN',
        'swansea_city': 'SWN',
        'tottenham': 'TOT',
        'watford': 'WAT',
        'west_bromwich': 'WBA',
        'west_ham': 'WHU'
    }
}

export function getLeague(league = leagues) {
    const leagues = Array.isArray(league) ? league : [league];

    return leagues.map(league => {
        const url = `${provider.url}/leagues/${league}`;

        return fetch(url, { headers: provider.headers })
            .then(res => res.json())
            .then(json => json.data.leagues[0]);
    });
}

export function getRounds(league = leagues, season = currentSeason) {
    const leagues = Array.isArray(league) ? league : [league];

    return leagues.map(league => {
        const url = `${provider.url}/leagues/${league}/seasons/${season}/rounds`;

        return fetch(url, { headers: provider.headers })
            .then(res => res.json())
            .then(json => {
                return json.data.rounds.map(round => {
                    round.round = parseInt(round.round_slug.split('-')[1], 10);

                    return round;
                });
            });
    });
}

export function getRound(league = leagues, season = currentSeason, round) {
    const leagues = Array.isArray(league) ? league : [league];

    return leagues.map(league => {
        const url = `${provider.url}/leagues/${league}/seasons/${season}/rounds/${round}`;

        return fetch(url, { headers: provider.headers })
            .then(res => res.json())
            .then(json => {
                const rounds = json.data.rounds[0];

                rounds.matches = rounds.matches.map(fixture => {
                    const teams = fixture['match_slug'].split('-');
                    const scores = fixture['match_result'].split('-');

                    fixture.home_team_slug = teams[0];
                    fixture.away_team_slug = teams[1];
                    fixture.home_score = parseInt(scores[0], 10);
                    fixture.away_score = parseInt(scores[1], 10);
                    fixture.home_team_short_name = lookups.shortNames[teams[0]];
                    fixture.away_team_short_name = lookups.shortNames[teams[1]];

                    return fixture;
                });

                return rounds;
            });
    });
}

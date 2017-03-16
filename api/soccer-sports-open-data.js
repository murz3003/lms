import fetch from 'node-fetch';
import minimist from 'minimist';

import * as config from './config';

const apiKey = minimist(process.argv).apiKey;

if (!apiKey) {
    throw new Error('You must provide an apiKey for the provider: soccer-sports-open-data');
}

const provider = {
    url: 'https://sportsop-soccer-sports-open-data-v1.p.mashape.com/v1',
    headers: {
        'X-Mashape-Key': apiKey,
        'Accept': 'application/json'
    }
};

export function getLeague(league = config.leagues) {
    const leagues = Array.isArray(league) ? league : [league];

    return leagues.map(league => {
        const url = `${provider.url}/leagues/${league}`;

        return fetch(url, { headers: provider.headers })
            .then(res => res.json())
            .then(json => json.data.leagues[0]);
    });
}

export function getRounds(league = config.leagues, season = config.season) {
    const leagues = Array.isArray(league) ? league : [league];

    return leagues.map(league => {
        const url = `${provider.url}/leagues/${league}/seasons/${season}/rounds`;

        return fetch(url, { headers: provider.headers })
            .then(res => res.json())
            .then(json => json.data.rounds);
    });
}

export function getRound(league = config.leagues, season = config.season, round) {
    const leagues = Array.isArray(league) ? league : [league];

    return leagues.map(league => {
        const url = `${provider.url}/leagues/${league}/seasons/${season}/rounds/${round}`;

        return fetch(url, { headers: provider.headers })
            .then(res => res.json())
            .then(json => json.data.rounds[0]);
    });
}

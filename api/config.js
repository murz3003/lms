import * as _config from './_config.json';

export const leagues = ['premier-league'];
export const currentSeason = '16-17';

export const provider = {
	name: 'soccer-sports-open-data',
	apiKey: _config.provider.apiKey || null
};

export const auth = {
	..._config.auth,
	google: { ..._config.auth.google, callbackURL: '/auth/google/callback' }
};

export const db = {
	url: _config.db.url || null
};

import path from 'path';
import mongoose from 'mongoose';

import * as config from './config';
import { Competition } from './models/competition';

const provider = require(path.resolve(__dirname, config.provider.name));
const database = mongoose.connect(config.db.url);

mongoose.Promise = global.Promise;

export const getOpenCompetitions = () => {
    const now = new Date().toISOString();

    return Competition
        .where('starts')
        .gte(now)
        .sort({ starts: 'asc' })
        .limit(1)
        .exec();
};

export const createOpenCompetition = () => {
    return new Promise((resolve, reject) => {
        const promises = provider.getLeague().concat(provider.getRounds());
        const now = new Date().toISOString();

        Promise.all(promises).then(data => {
            return {
                league: data[0],
                round: data[1].find(round => {
                    const date = new Date(round.start_date).toISOString();

                    return date > now;
                })
            };
        }).then(data => {
            debugger;
            const newCompetition = new Competition({
                    league: data.league,
                    round: {
                        start: data.round.round,
                        current: data.round.round,
                        end: null
                    },
                    starts: new Date(data.round.start_date).toISOString()
                });

            newCompetition.save()
                .then(doc => resolve([doc]))
                .catch(reject);
        }).catch(reject);
    });
};

export const getCompetition = (league, round) => {
    debugger;
    return Competition
        .findOne()
        .where('league.league_slug')
        .gte(now)
        .sort({ starts: 'asc' })
        .limit(1)
        .exec();
};

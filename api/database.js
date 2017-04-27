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
        .exec();
};

export const createOpenCompetition = (league) => {
    return new Promise((resolve, reject) => {
        const promises = [provider.getLeague(league), provider.getRounds(league)];
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
                .then(doc => resolve(doc))
                .catch(reject);
        }).catch(reject);
    });
};

export const getCompetition = (league, round) => {
    return Competition
        .findOne()
        .where('league.league_slug').equals(league)
        .where('round.start').equals(round)
        .exec();
};

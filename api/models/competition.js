import mongoose from 'mongoose';

const CompetitionSchema = mongoose.Schema({
    entered: { type: Boolean, default: false }, // TODO: Move this to a users entered competition
    pickedTeam: { type: Boolean, default: false }, // TODO: Move this to a users entered competition
    league: Object,
    round: {
        start: { type: Number, default: null },
        current: { type: Number, default: null },
        end: { type: Number, default: null }
    },
    starts: Date,
    players: {
        entered: { type: Number, default: 0 },
        remaining: { type: Number, default: 0 }
    }
});

export const Competition = mongoose.model('Competition', CompetitionSchema);

import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    accessToken: String,
    firstName: String,
    lastName: String,
    emails: Array,
    google: Object
});

UserSchema.statics.findOrCreate = function (filter, data, done) {
    User.findOne(filter, function (err, user) {
        if (err) {
            return done(err);
        }

        if (!user) {
            const newUser = new User(data);

            newUser.save(function (err, user) {
                done(err, user);
            });
        } else {
            done(null, user);
        }
    });
};

export const User = mongoose.model('User', UserSchema);

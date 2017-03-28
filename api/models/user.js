import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    access_token: String,
	google: {
		id: String,
		token: String,
		email: String,
		name: String
	}
});

export const User = mongoose.model('User', UserSchema);

import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
	google: {
		id: String,
		token: String,
		email: String,
		name: String
	}
});

export const User = mongoose.model('User', userSchema);

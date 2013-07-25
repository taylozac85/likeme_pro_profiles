var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	email: {type: String, unique: true},
	password: String,
	name: {
		first: String,
		last: String
		},
	company: String,
	bio: String,
	website: String,
	picture: [],
	phone: String,
	address: String
});

module.exports = UserSchema;